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
    .min(1, { message: 'Please enter content. (en)' }),
  content_ja: z
    .string({
      invalid_type_error: 'Please enter content. (ja)',
    })
    .min(1, { message: 'Please enter content. (ja)' }),
  content_kr: z
    .string({
      invalid_type_error: 'Please enter content. (kr)',
    })
    .min(1, { message: 'Please enter content. (kr)' }),
  content_hk: z
    .string({
      invalid_type_error: 'Please enter content. (hk)',
    })
    .min(1, { message: 'Please enter content. (hk)' }),
  modify_date: z.string(),
});

const CommentSchema = z.object({
  id: z.string(),
  commentContent: z
    .string({
      invalid_type_error: 'Please enter a comment.',
    })
    .min(1, { message: 'Please enter a comment.' }),
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

  try {
    const createPostQuery = format(
      `
      INSERT INTO posts_%s (id, title, thumbnail_img, tags, content, author, comment_id_list, create_date, modify_date, likes)
          VALUES ('${id}', '${postTitle}', '${thumbnail_img}', ARRAY[%L]::VARCHAR[], '${postContent}', '${postAuthor}', ARRAY[%L]::VARCHAR[], '${create_date}', '${modify_date}', '0')
          ON CONFLICT (id) DO NOTHING;
          `,
      locale,
      tags,
      comment_id_list,
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
        errors: validatedFields.error.flatten().fieldErrors,
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
        errors: validatedFields.error.flatten().fieldErrors,
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
  currentLocale: string,
) {

  const dict = getDictionary(currentLocale);
  let content = commentContent;
  console.log('comment id : ' + id);
  const create_date = new Date().toISOString().split('T')[0];
  const modify_date = create_date;

  try {
    const createCommentQuery = format(
      `
      INSERT INTO comments (id, post_id, user_name, user_img, content, create_date, modify_date, likes )
          VALUES ('${id}', '${postId}', '${userName}', '${userImage}', '${content}', '${create_date}', '${modify_date}', '0')
          ON CONFLICT (id) DO NOTHING;
          `,
    );

    const createComment = await client.query(createCommentQuery);
  } catch (error) {
    console.log(error);
    // TODO: add localization
    return {
      message: 'Failed to add new comment',
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
  const dict = getDictionary(currentLocale);
  let content = commentContent;
  console.log('update comment id : ' + commentId);


  try {
    const validatedFields = UpdateComment.safeParse({
      id: commentId,
      commentContent: commentContent,
    });

    // TODO: add localization
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Comment.',
      };
    }

    const updateCommentQuery = format(
      `
      UPDATE comments
      SET content = %L
      WHERE id = %L
      `,
      content,
      commentId,
    );

    const updateComment = await client.query(updateCommentQuery);
    console.log('updateComment: ' + updateComment);
  } catch (error) {
    console.log(error);
    // TODO: add localization
    return {
      message: 'Failed to update comment',
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
  currentLocale: string,
) {
  const dict = getDictionary(currentLocale);

  try {
    const client = await db.connect();

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
    console.log('addCommentToPost: ' + addCommentToPost);

  } catch (error) {
    console.log(error);
    // TODO: add localization
    return {
      message: 'Failed to add comment to post',
    };
  }
}

export async function createCommentWithAllLanguages(
  commentContent: string,
  currentLocale: string,
  postId: string,
  postTitle: string,
  userName: string,
  userImage: string,
  prevState: CommentState,
  formData: FormData,
) {

  const dict = getDictionary(currentLocale);
  const id = require('uuid').v4();
  console.log('create comment: ' + id);

  try {
    const client = await db.connect();

    const validatedFields = CreateComment.safeParse({
      commentContent: commentContent,
    });

    // TODO: add localization
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Add New Comment.',
      };
    }


    const addResult = await Promise.all([
      createComment(
        id,
        commentContent,
        postId,
        userName,
        userImage,
        client,
        currentLocale,
      ),
      addCommentToPost(
        postId,
        id,
        'en',
        currentLocale,
      ),
      addCommentToPost(
        postId,
        id,
        'ja',
        currentLocale,
      ),
      addCommentToPost(
        postId,
        id,
        'kr',
        currentLocale,
      ),
      addCommentToPost(
        postId,
        id,
        'hk',
        currentLocale,
      ),
    ]);
  } catch (error) {
    console.error(error);
    // TODO: add localization
    return {
      message: 'Failed to add comment',
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

