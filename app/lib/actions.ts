'use server';
import { GetLangFromLocale } from '@/app/lib/constants';

import { z } from 'zod';
import { VercelPoolClient } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { keyName } from './constants';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { getDictionary } from '@/app/components/localization/dictionaries';

const format = require('pg-format');
const { db } = require('@vercel/postgres');

const FormSchema = z.object({
  id: z.string(),
  title_en: z
    .string({
      invalid_type_error: 'Please enter a title (en).',
    })
    .min(1, { message: 'Please enter a title (en).' }),
  title_ja: z
    .string({
      invalid_type_error: 'Please enter a title (ja).',
    })
    .min(1, { message: 'Please enter a title (ja).' }),
  title_kr: z
    .string({
      invalid_type_error: 'Please enter a title (kr).',
    })
    .min(1, { message: 'Please enter a title (kr).' }),
  title_hk: z
    .string({
      invalid_type_error: 'Please enter a title (hk).',
    })
    .min(1, { message: 'Please enter a title (hk).' }),
  thumbnail_img: z
    .string({
      invalid_type_error: 'Please upload a thumbnail image.',
    })
    .min(1, { message: 'Please upload a thumbnail image.' }),
  tags: z
    .array(
      z.string({
        invalid_type_error: 'Please enter valid tags.',
      }),
    )
    .min(1, 'Please enter at least one tag.'),
  content_en: z
    .string({
      invalid_type_error: 'Please enter content. (en)',
    })
    .min(1, { message: 'Please enter content. (en)' })
    .refine((val) => val.trim().length > 0, {
      message: 'Please enter content. (en)',
    }),
  content_ja: z
    .string({
      invalid_type_error: 'Please enter content. (ja)',
    })
    .min(1, { message: 'Please enter content. (ja)' })
    .refine((val) => val.trim().length > 0, {
      message: 'Please enter content. (ja)',
    }),
  content_kr: z
    .string({
      invalid_type_error: 'Please enter content. (kr)',
    })
    .min(1, { message: 'Please enter content. (kr)' })
    .refine((val) => val.trim().length > 0, {
      message: 'Please enter content. (kr)',
    }),
  content_hk: z
    .string({
      invalid_type_error: 'Please enter content. (hk)',
    })
    .min(1, { message: 'Please enter content. (hk)' })
    .refine((val) => val.trim().length > 0, {
      message: 'Please enter content. (hk)',
    }),
  modify_date: z.string(),
});

const CommentSchema = z.object({
  id: z.string(),
  commentContent: z
    .string({
      invalid_type_error: 'dict.comment.pleaseEnterComment',
    })
    .min(1, { message: 'dict.comment.pleaseEnterComment' })
    .refine((val) => val.trim().length > 0, {
      message: 'dict.comment.pleaseEnterComment',
    }),
});

const CreateComment = CommentSchema.omit({ id: true });
const UpdateComment = CommentSchema;

const CreatePost = FormSchema.omit({ id: true, modify_date: true });
const UpdatePost = FormSchema.omit({
  id: true,
  modify_date: true,
  thumbnail_img: true,
});

export type State = {
  errors?: {
    id?: string[];
    title_en?: string[];
    title_ja?: string[];
    title_kr?: string[];
    title_hk?: string[];
    thumbnail_img?: string[];
    tags?: string[];
    content_en?: string[];
    content_ja?: string[];
    content_kr?: string[];
    content_hk?: string[];
  };
  message?: string | null;
};

export type CommentState = {
  errors?: {
    id?: string[];
    commentContent?: string[];
  };
  message?: string | null;
};

export async function createPost(
  id: string,
  thumbnail_img: string,
  tags: string[],
  postTitle: string,
  postContent: string,
  locale: string,
  client: VercelPoolClient,
) {
  let content = postContent;
  console.log('id : ' + id);
  console.log('title: ' + postTitle);
  console.log('content: ' + content);
  console.log('tags: ' + tags);
  console.log('locale: ' + locale);
  console.log('\n');
  const create_date = new Date().toISOString().split('T')[0];
  const modify_date = create_date;
  const postAuthor = keyName;
  const comment_id_list: string[] = [];
  const likes: string[] = [];

  try {
    const createPostQuery = format(
      `
      INSERT INTO posts_%s (id, title, thumbnail_img, tags, content, author, comment_id_list, create_date, modify_date, likes)
      VALUES (%L, %L, %L, ARRAY[%L]::VARCHAR[], %L, %L, ARRAY[%L]::VARCHAR[], %L, %L, ARRAY[%L]::VARCHAR[])
      ON CONFLICT (id) DO NOTHING;
      `,
      locale,
      id,
      postTitle,
      thumbnail_img,
      tags,
      postContent,
      postAuthor,
      comment_id_list,
      create_date,
      modify_date,
      likes
    );

    const createPost = await client.query(createPostQuery);
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to add new post (' + locale + ')',
    };
  }
}

export async function createPostWithAllLanguages(
  currentLocale: string,
  thumbnail_img: string,
  postTags: string[],
  postContent_en: string,
  postContent_ja: string,
  postContent_kr: string,
  postContent_hk: string,
  prevState: State,
  formData: FormData,
) {
  const id = require('uuid').v4();
  console.log('create: ' + id);

  try {
    const client = await db.connect();

    const validatedFields = CreatePost.safeParse({
      title_en: formData.get('title_en'),
      title_ja: formData.get('title_ja'),
      title_kr: formData.get('title_kr'),
      title_hk: formData.get('title_hk'),
      thumbnail_img: thumbnail_img,
      tags: postTags,
      content_en: postContent_en,
      content_ja: postContent_ja,
      content_kr: postContent_kr,
      content_hk: postContent_hk,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error ? validatedFields.error.flatten().fieldErrors : {},
        message: 'Missing Fields. Failed to Add New Post.',
      };
    }

    const { title_en, title_ja, title_kr, title_hk } = validatedFields.data;

    const addResult = await Promise.all([
      createPost(
        id,
        thumbnail_img,
        postTags,
        title_en,
        postContent_en,
        'en',
        client,
      ),
      createPost(
        id,
        thumbnail_img,
        postTags,
        title_ja,
        postContent_ja,
        'ja',
        client,
      ),
      createPost(
        id,
        thumbnail_img,
        postTags,
        title_kr,
        postContent_kr,
        'kr',
        client,
      ),
      createPost(
        id,
        thumbnail_img,
        postTags,
        title_hk,
        postContent_hk,
        'hk',
        client,
      ),
    ]);
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to update post',
    };
  }

  const lang = GetLangFromLocale(currentLocale);
  const urlRegex = /\s/g;
  let title = formData.get('title_en') as string;
  switch (currentLocale) {
    case 'en':
      title = formData.get('title_en') as string;
      break;
    case 'ja':
      title = encodeURI(formData.get('title_ja') as string);
      break;
    case 'kr':
      title = encodeURI(formData.get('title_kr') as string);
      break;
    case 'hk':
      title = encodeURI(formData.get('title_hk') as string);
      break;
  }

  const url_title = title.toLowerCase().replace(urlRegex, '-');
  const redirectUrl = `/${lang}/posts/${url_title}/${id}`;

  revalidatePath(redirectUrl);
  redirect(redirectUrl);
}

export async function updatePost(
  id: string,
  thumbnail_img: string,
  tags: string[],
  postTitle: string,
  postContent: string,
  locale: string,
  client: VercelPoolClient,
) {
  let content = postContent;
  console.log('id : ' + id);
  console.log('title: ' + postTitle);
  console.log('content: ' + content);
  console.log('tags: ' + tags);
  const modify_date = new Date().toISOString().split('T')[0];

  try {
    const updatePostQuery = format(
      `
      UPDATE posts_%s
      SET title = %L, thumbnail_img = %L, tags=ARRAY[%L]::VARCHAR[], content = %L, modify_date = %L
      WHERE id = %L
      `,
      locale,
      postTitle,
      thumbnail_img,
      tags,
      content,
      modify_date,
      id,
    );

    const updatePost = await client.query(updatePostQuery);
    console.log('updatePost: ' + updatePost);
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to update post (' + locale + ')',
    };
  }
}

export async function updatePostWithAllLanguages(
  currentLocale: string,
  id: string,
  thumbnail_img: string,
  postTags: string[],
  postContent_en: string,
  postContent_ja: string,
  postContent_kr: string,
  postContent_hk: string,
  prevState: State,
  formData: FormData,
) {
  console.log('updatePost: ' + id);

  try {
    const client = await db.connect();

    const validatedFields = UpdatePost.safeParse({
      title_en: formData.get('title_en'),
      title_ja: formData.get('title_ja'),
      title_kr: formData.get('title_kr'),
      title_hk: formData.get('title_hk'),
      thumbnail_img: thumbnail_img,
      tags: postTags,
      content_en: postContent_en,
      content_ja: postContent_ja,
      content_kr: postContent_kr,
      content_hk: postContent_hk,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error ? validatedFields.error.flatten().fieldErrors : {},
        message: 'Missing Fields. Failed to Update Post.',
      };
    }

    const { title_en, title_ja, title_kr, title_hk } = validatedFields.data;

    const updateResult = await Promise.all([
      updatePost(
        id,
        thumbnail_img,
        postTags,
        title_en,
        postContent_en,
        'en',
        client,
      ),
      updatePost(
        id,
        thumbnail_img,
        postTags,
        title_ja,
        postContent_ja,
        'ja',
        client,
      ),
      updatePost(
        id,
        thumbnail_img,
        postTags,
        title_kr,
        postContent_kr,
        'kr',
        client,
      ),
      updatePost(
        id,
        thumbnail_img,
        postTags,
        title_hk,
        postContent_hk,
        'hk',
        client,
      ),
    ]);
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to update post',
    };
  }

  const lang = GetLangFromLocale(currentLocale);
  const urlRegex = /\s/g;
  let title = formData.get('title_en') as string;
  switch (currentLocale) {
    case 'en':
      title = formData.get('title_en') as string;
      break;
    case 'ja':
      title = encodeURI(formData.get('title_ja') as string);
      break;
    case 'kr':
      title = encodeURI(formData.get('title_kr') as string);
      break;
    case 'hk':
      title = encodeURI(formData.get('title_hk') as string);
      break;
  }

  const url_title = title.toLowerCase().replace(urlRegex, '-');
  const redirectUrl = `/${lang}/posts/${url_title}/${id}`;

  revalidatePath(redirectUrl);
  redirect(redirectUrl);
}

export async function deletePost(
  id: string,
  locale: string,
  client: VercelPoolClient,
) {
  console.log('id : ' + id);

  try {
    const deletePostQuery = format(
      `
      DELETE FROM posts_%s
      WHERE id = %L
      `,
      locale,
      id,
    );

    const deletePost = await client.query(deletePostQuery);
    console.log('deletePost: ' + deletePost);
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to delete post (' + locale + ')',
    };
  }
}

export async function deletePostWithAllLanguages(
  currentLocale: string,
  id: string,
) {
  console.log('deletePost: ' + id);

  try {
    const client = await db.connect();

    const updateResult = await Promise.all([
      deletePost(id, 'en', client),
      deletePost(id, 'ja', client),
      deletePost(id, 'kr', client),
      deletePost(id, 'hk', client),
    ]);
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to update post',
    };
  }

  const lang = GetLangFromLocale(currentLocale);
  const redirectUrl = `/${lang}/`;

  revalidatePath(redirectUrl);
  redirect(redirectUrl);
}

export async function addNewTag(tag: string) {
  try {
    const client = await db.connect();
    const addTagQuery = format(
      `
      INSERT INTO post_tags
      VALUES (%L)
      `,
      tag,
    );

    const addTag = await client.query(addTagQuery);
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to add tag',
    };
  }

  const redirectUrl = `/en/tag/manage`;
  revalidatePath(redirectUrl);
  redirect(redirectUrl);
}

export async function deleteTag(tag: string) {
  try {
    const client = await db.connect();
    const deleteTagQuery = format(
      `
      DELETE FROM post_tags
      WHERE name = %L
      `,
      tag,
    );

    const deleteTag = await client.query(deleteTagQuery);
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to delete tag',
    };
  }

  const redirectUrl = `/en/tag/manage`;
  revalidatePath(redirectUrl);
  redirect(redirectUrl);
}

export async function signInAction(provider: string, pathname: string) {
  try {
    const redirectUrl = `${pathname}#page-path`;
    await signIn(provider, {
      redirectTo: redirectUrl,
      redirect: true,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOutAction(pathname: string) {
  try {
    const redirectUrl = `${pathname}#page-path`;
    await signOut({ redirectTo: redirectUrl });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
  }
}

export async function createComment(
  id: string,
  commentContent: string,
  postId: string,
  userName: string,
  userImage: string,
  client: VercelPoolClient,
) {

  let content = commentContent;
  const create_date = new Date().toISOString().split('T')[0];
  const modify_date = create_date;
  const likes: string[] = [];

  try {
    const createCommentQuery = format(
      `
      INSERT INTO comments (id, post_id, user_name, user_img, content, create_date, modify_date, likes)
      VALUES (%L, %L, %L, %L, %L, %L, %L, ARRAY[%L]::VARCHAR[])
      ON CONFLICT (id) DO NOTHING;
      `,
      id, postId, userName, userImage, commentContent, create_date, modify_date, likes
    );


    const createComment = await client.query(createCommentQuery);
    console.log('createComment: ' + createComment);
  } catch (error) {
    console.log(error);
    return {
      message: 'dict.comment.failAddComment',
    };
  }
}

export async function updateComment(
  commentId: string,
  currentLocale: string,
  commentContent: string,
  postId: string,
  postTitle: string,
  prevState: CommentState,
  formData: FormData,
) {
  const client = await db.connect();
  let content = commentContent;
  console.log('update comment id : ' + commentId);
  console.log('update comment content: ' + content);


  try {
    const validatedFields = UpdateComment.safeParse({
      id: commentId,
      commentContent: commentContent,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'dict.comment.pleaseEnterComment',
      };
    }

    const updateCommentQuery = format(
      `
      UPDATE comments
      SET content = %L,
          modify_date = NOW()
      WHERE id = %L
      `,
      content,
      commentId,
    );

    const updateComment = await client.query(updateCommentQuery);
    console.log('updateComment success with content: ' + content);
  } catch (error) {
    console.log(error);
    return {
      message: 'dict.comment.failUpdateComment',
    };
  }

  const lang = GetLangFromLocale(currentLocale);
  const urlRegex = /\s/g;
  let title = postTitle;
  switch (currentLocale) {
    case 'en':
      break;
    case 'ja':
      title = encodeURI(title);
      break;
    case 'kr':
      title = encodeURI(title);
      break;
    case 'hk':
      title = encodeURI(title);
      break;
  }

  const url_title = title.toLowerCase().replace(urlRegex, '-');
  const redirectUrl = `/${lang}/posts/${url_title}/${postId}`;

  revalidatePath(redirectUrl);
  redirect(redirectUrl);
}

export async function addCommentToPost(
  postId: string,
  commentId: string,
  postLocale: string,
  client: VercelPoolClient
) {

  try {
    const addCommentQuery = format(
      `
      UPDATE posts_%s
      SET comment_id_list = array_append(comment_id_list, %L)
      WHERE id = %L
      `,
      postLocale,
      commentId,
      postId,
    );

    const addCommentToPost = await client.query(addCommentQuery);
    console.log('addCommentToPost in ' + postLocale + ': postId: ' + postId + ', commentId: ' + commentId);

  } catch (error) {
    console.log(error);
    return {
      message: 'dict.comment.failAddComment',
    };
  }
}

export async function createCommentWithAllLanguagesAndNotifications(
  commentContent: string,
  currentLocale: string,
  postId: string,
  postTitle: string,
  userName: string,
  userImage: string,
  notifyTargetUserList: string[],
  prevState: CommentState,
  formData: FormData,
) {

  const id = require('uuid').v4();
  console.log('create comment all language: ' + id);
  console.log('comment content: ' + commentContent);

  let client: VercelPoolClient | null = null;
  try {
    const connectionResult = await Promise.race([
      db.connect(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database connection timeout')), 5000)
      ),
    ]);

    client = connectionResult as VercelPoolClient;

    console.log('Database connected');
    const validatedFields = CreateComment.safeParse({
      commentContent: commentContent,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'dict.comment.pleaseEnterComment',
      };
    }


    console.log('Fields validated');
    const addResults = await Promise.allSettled([
      createComment(
        id,
        commentContent,
        postId,
        userName,
        userImage,
        client,
      ),
      addCommentToPost(
        postId,
        id,
        'en',
        client,
      ),
      addCommentToPost(
        postId,
        id,
        'ja',
        client,
      ),
      addCommentToPost(
        postId,
        id,
        'kr',
        client,
      ),
      addCommentToPost(
        postId,
        id,
        'hk',
        client,
      ),
    ]);

    for (const result of addResults) {
      if (result.status === 'rejected') {
        throw new Error(result.reason);
      }
    }

    console.log('Comments added to all languages');

    createCommentNotificationForTargetUserList(
      notifyTargetUserList,
      userName,
      userImage,
      postId,
      postTitle,
      id,
      commentContent,
      currentLocale,
      client,
    );
  } catch (error) {
    console.error('Error in createCommentWithAllLanguages:', error);
    return {
      errors: { commentContent: ['Network Error'] },
      message: 'dict.comment.failAddComment',
    };
  } finally {
    if (client !== null) {
      client.release();
      console.log('Database connection closed');
    }
  }



  const lang = GetLangFromLocale(currentLocale);
  const urlRegex = /\s/g;
  let title = postTitle;
  switch (currentLocale) {
    case 'en':
      break;
    case 'ja':
      title = encodeURI(title);
      break;
    case 'kr':
      title = encodeURI(title);
      break;
    case 'hk':
      title = encodeURI(title);
      break;
  }

  const url_title = title.toLowerCase().replace(urlRegex, '-');
  const redirectUrl = `/${lang}/posts/${url_title}/${postId}`;
  console.log('added comment redirectUrl: ' + redirectUrl);

  revalidatePath(redirectUrl);
  redirect(redirectUrl);
}

export async function deleteComment(
  commentId: string,
  currentLocale: string,
  client: VercelPoolClient,
) {
  const dict = getDictionary(currentLocale);
  console.log('delete comment id : ' + commentId);

  try {
    const deleteCommentQuery = format(
      `
      DELETE FROM comments
      WHERE id = %L
      `,
      commentId,
    );

    const deleteComment = await client.query(deleteCommentQuery);
    console.log('deleteComment successful id: ' + commentId);
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to delete comment (' + commentId + ')',
    };
  }
}

export async function deleteCommentFromPost(
  postId: string,
  commentId: string,
  postLocale: string,
  currentLocale: string,
  client: VercelPoolClient,
) {
  const dict = getDictionary(currentLocale);
  console.log('deleteCommentFromPost: locale: (' + postLocale + ') postId: ' + postId + ', commentId: ' + commentId);

  try {
    const deleteCommentQuery = format(
      `
      UPDATE posts_%s
      SET comment_id_list = array_remove(comment_id_list, %L)
      WHERE id = %L
      `,
      postLocale,
      commentId,
      postId,
    );

    const deleteCommentFromPost = await client.query(deleteCommentQuery);
    console.log('deleteCommentFromPost successfully in ' + postLocale + ': postId: ' + postId + ', commentId: ' + commentId);
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to delete comment from post',
    };
  }
}

export async function deleteCommentWithAllLanguages(
  currentLocale: string,
  commentId: string,
  postId: string,
  postTitle: string,
) {
  console.log('deleteComment: ' + commentId);

  try {
    const client = await db.connect();

    const deleteResult = await Promise.all([
      deleteComment(commentId, currentLocale, client),
      deleteCommentFromPost(postId, commentId, 'en', currentLocale, client),
      deleteCommentFromPost(postId, commentId, 'ja', currentLocale, client),
      deleteCommentFromPost(postId, commentId, 'kr', currentLocale, client),
      deleteCommentFromPost(postId, commentId, 'hk', currentLocale, client),
    ]);
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to delete comment',
    };
  }


  const lang = GetLangFromLocale(currentLocale);
  const urlRegex = /\s/g;
  let title = postTitle;
  switch (currentLocale) {
    case 'en':
      break;
    case 'ja':
      title = encodeURI(title);
      break;
    case 'kr':
      title = encodeURI(title);
      break;
    case 'hk':
      title = encodeURI(title);
      break;
  }

  const url_title = title.toLowerCase().replace(urlRegex, '-');
  const redirectUrl = `/${lang}/posts/${url_title}/${postId}`;
  console.log('added comment redirectUrl: ' + redirectUrl);

  revalidatePath(redirectUrl);
  redirect(redirectUrl);

}

export async function likeComment(
  userName: string,
  commentId: string,
) {

  try {
    console.log('like comment id : ' + commentId);
    const client = await db.connect();
    const likeCommentQuery = format(
      `
      UPDATE comments
      SET likes = array_append(likes, %L)
      WHERE id = %L
      `,
      userName,
      commentId,
    );

    const likeComment = await client.query(likeCommentQuery);
    console.log('likeComment successfully userName: ' + userName);
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to like comment (' + commentId + ')',
    };
  }
}

export async function unlikeComment(
  userName: string,
  commentId: string,
) {

  try {
    console.log('unlike comment id : ' + commentId);
    const client = await db.connect();
    const unlikeCommentQuery = format(
      `
      UPDATE comments
      SET likes = array_remove(likes, %L)
      WHERE id = %L
      `,
      userName,
      commentId,
    );

    const unlikeComment = await client.query(unlikeCommentQuery);
    console.log('unlikeComment successfully userName: ' + userName);
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to unlike comment (' + commentId + ')',
    };
  }
}

export async function likePost(
  userName: string,
  postId: string,
  postLocale: string,
  client: VercelPoolClient,
) {

  try {
    console.log('like post id : ' + postId + ' in ' + postLocale);
    const likePostQuery = format(
      `
      UPDATE posts_%s
      SET likes = array_append(likes, %L)
      WHERE id = %L
      `,
      postLocale,
      userName,
      postId,
    );

    const likePost = await client.query(likePostQuery);
    console.log('likePost successfully userName: ' + userName, + ' in ' + postLocale + ' postId: ' + postId);
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to like post (' + postId + ')',
    };
  }
}

export async function unlikePost(
  userName: string,
  postId: string,
  postLocale: string,
  client: VercelPoolClient,
) {

  try {
    console.log('unlike post id : ' + postId + ' in ' + postLocale);
    const unlikePostQuery = format(
      `
      UPDATE posts_%s
      SET likes = array_remove(likes, %L)
      WHERE id = %L
      `,
      postLocale,
      userName,
      postId,
    );

    const unlikePost = await client.query(unlikePostQuery);
    console.log('unlikePost successfully userName: ' + userName, + ' in ' + postLocale + ' postId: ' + postId);
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to unlike post (' + postId + ')',
    };
  }
}

export async function likePostWithAllLanguages(
  userName: string,
  postId: string,
) {
  console.log('likePost: ' + postId);

  try {
    const client = await db.connect();

    const likeResult = await Promise.all([
      likePost(userName, postId, 'en', client),
      likePost(userName, postId, 'ja', client),
      likePost(userName, postId, 'kr', client),
      likePost(userName, postId, 'hk', client),
    ]);
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to like post',
    };
  }
}

export async function unlikePostWithAllLanguages(
  userName: string,
  postId: string,
) {
  console.log('unlikePost: ' + postId);

  try {
    const client = await db.connect();

    const unlikeResult = await Promise.all([
      unlikePost(userName, postId, 'en', client),
      unlikePost(userName, postId, 'ja', client),
      unlikePost(userName, postId, 'kr', client),
      unlikePost(userName, postId, 'hk', client),
    ]);
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to unlike post',
    };
  }
}

export async function createLikePostNotificationForPostAuthor(
  sourceUserName: string,
  sourceUserImage: string,
  postId: string,
  postTitle: string,
  sourceLocale: string,
  client: VercelPoolClient,
) {
  console.log('createLikePostNotificationForAuthor, postTitle: ' + postTitle + ', postId: ' + postId + ', sourceUserName: ' + sourceUserName);

  try {
    const type = 'like';
    const create_date = new Date().toISOString().split('T')[0];
    const isRead = false;
    const id = require('uuid').v4();
    const targetUserName = keyName;
    const commentId = null;
    const commentContent = null;

    const createNotificationQuery = format(
      `
        INSERT INTO notifications (id, source_user_name, source_user_img, target_user_name, post_id, post_title, comment_id, comment_content, type, source_locale, create_date, is_read)
        VALUES (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L, FALSE)
        ON CONFLICT (id) DO NOTHING;
        `,
      id, sourceUserName, sourceUserImage, targetUserName, postId, postTitle, commentId, commentContent, type, sourceLocale, create_date, isRead,
    );

    const createNotification = await client.query(createNotificationQuery);
    console.log('create like post notification successfully sourceUserName: ' + sourceUserName);
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to create notification',
    };
  }
}

export async function createCommentNotificationForTargetUserList(
  targetUserNameList: string[],
  sourceUserName: string,
  sourceUserImage: string,
  postId: string,
  postTitle: string,
  commentId: string,
  commentContent: string,
  sourceLocale: string,
  client: VercelPoolClient,
) {
  console.log('createCommentNotificationForTargetUserList, postTitle: ' + postTitle + ', postId: ' + postId + ', commentId: ' + commentId + ', commentContent: ' + commentContent + ', sourceUserName: ' + sourceUserName + ', targetUserNameList: ' + targetUserNameList);

  try {
    const type = 'comment';
    const create_date = new Date().toISOString().split('T')[0];
    for (const targetUserName of targetUserNameList) {
      if (targetUserName === sourceUserName) {
        continue;
      }
      const id = require('uuid').v4();
      const isRead = false;

      const createNotificationQuery = format(
        `
        INSERT INTO notifications (id, source_user_name, source_user_img, target_user_name, post_id, post_title, comment_id, comment_content, type, source_locale, create_date, is_read)
        VALUES (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L, FALSE)
        ON CONFLICT (id) DO NOTHING;
        `,
        id, sourceUserName, sourceUserImage, targetUserName, postId, postTitle, commentId, commentContent, type, sourceLocale, create_date, isRead,
      );

      const createNotification = await client.query(createNotificationQuery);
      console.log('create comment notification successfully targetUserName: ' + targetUserName);
    }
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to create notification',
    };
  }
}

export async function createLikeCommentNotificationForCommentAuthor(
  targetUserName: string,
  sourceUserName: string,
  sourceUserImage: string,
  postId: string,
  postTitle: string,
  commentId: string,
  commentContent: string,
  sourceLocale: string,
  client: VercelPoolClient
) {
  console.log('createLikeCommentNotificationForCommentAuthor, postTitle: ' + postTitle + ', postId: ' + postId + ', commentId: ' + commentId + ', commentContent: ' + commentContent + ', sourceUserName: ' + sourceUserName + ', targetUserName: ' + targetUserName);

  try {
    const type = 'like';
    const create_date = new Date().toISOString().split('T')[0];
    const isRead = false;
    const id = require('uuid').v4;

    const createNotificationQuery = format(
      `
        INSERT INTO notifications (id, source_user_name, source_user_img, target_user_name, post_id, post_title, comment_id, comment_content, type, source_locale, create_date, is_read)
        VALUES (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L, FALSE)
        ON CONFLICT (id) DO NOTHING;
        `,
      id, sourceUserName, sourceUserImage, targetUserName, postId, postTitle, commentId, commentContent, type, sourceLocale, create_date, isRead,
    );

    const createNotification = await client.query(createNotificationQuery);
    console.log('create like comment notification successfully targetUserName: ' + targetUserName);
  } catch (error) {
    console.log(error);
    return {
      message: 'Failed to create notification',
    };
  }
}