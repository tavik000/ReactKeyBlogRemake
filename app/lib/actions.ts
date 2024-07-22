'use server';

import { z } from 'zod';
import { sql, VercelPoolClient } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { keyName } from './constants';
import { log } from 'console';

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
  thumbnail_img: z.string({
    invalid_type_error: 'Please enter a thumbnail image.',
  }),
  tags: z.string({
    invalid_type_error: 'Please enter tags.',
  }),
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

const CreatePost = FormSchema.omit({ id: true, modify_date: true });
const UpdatePost = FormSchema.omit({
  id: true,
  modify_date: true,
  thumbnail_img: true,
  tags: true,
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

// export async function createPost(
//   client: VercelPoolClient,
//   prevState: State,
//   formData: FormData,
//   locale: string,
// ) {
//   // Validate form fields using Zod
//   const validatedFields = CreatePost.safeParse({
//     title_en: formData.get('title_en'),
//     title_ja: formData.get('title_ja'),
//     title_kr: formData.get('title_kr'),
//     title_zh: formData.get('title_zh'),
//     thumbnail_img: formData.get('thumbnail_img'),
//     tags: formData.get('tags'),
//     content_en: formData.get('content_en'),
//     content_ja: formData.get('content_ja'),
//     content_kr: formData.get('content_kr'),
//     content_zh: formData.get('content_zh'),
//   });

//   // If form validation fails, return errors early. Otherwise, continue.
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create Post.',
//     };
//   }

//   // Prepare data for insertion into the database
//   const { title_en, title_ja, title_kr, title_zh, thumbnail_img, tags, content } = validatedFields.data;
//   const create_date = new Date().toISOString().split('T')[0];
//   const modify_date = create_date;
//   const author = keyName;
//   const comment_id_list: string[] = [];
//   const likes = 0;
//   const id = require('uuid').v4();
//   console.log('post id: ' + id);

//   // Insert data into the database
//   try {
//     const createPostQuery = format(
//       `
//       INSERT INTO posts_%s (id, title, thumbnail_img, tags, content, author, comment_id_list, create_date, modify_date, likes)
//       VALUE (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L)
//       ON CONFLICT (id) DO NOTHING
//       `,
//       locale,
//       id,
//       title,
//       thumbnail_img,
//       tags,
//       content,
//       author,
//       comment_id_list,
//       create_date,
//       modify_date,
//       likes,
//     );

//     const createPost = await client.query(createPostQuery);

//     revalidatePath('/');
//     redirect('/');
//     return { message: 'Post created successfully' };
//   } catch (error) {
//     return { message: 'Failed to create post' };
//   }
// }

export async function updatePost(
  id: string,
  thumbnail_img: string,
  postTitle: string,
  postContent: string,
  locale: string,
  client: VercelPoolClient,
) {
  let content = postContent;
  console.log('id : ' + id);
  console.log('title: ' + postTitle);
  console.log('content: ' + content);
  const modify_date = new Date().toISOString().split('T')[0];

  try {
    // const updatePostQuery = format(
    //   `
    //   UPDATE posts_%s
    //   SET title = %L, thumbnail_img = %L, tags = %L, content = %L, modify_date = %L
    //   WHERE id = %L
    //   `,
    //   locale,
    //   title,
    //   thumbnail_img,
    //   tags,
    //   content,
    //   modify_date,
    //   formData.get('id')
    // );
    const updatePostQuery = format(
      `
      UPDATE posts_%s
      SET title = %L, thumbnail_img = %L, content = %L, modify_date = %L
      WHERE id = %L
      `,
      locale,
      postTitle,
      thumbnail_img,
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
  id: string,
  thumbnail_img: string,
  postContent_en: string,
  postContent_ja: string,
  postContent_kr: string,
  postContent_hk: string,
  prevState: State,
  formData: FormData,
) {
  //log
  console.log('updatePost: ' + id);

  try {
    const client = await db.connect();

    const validatedFields = UpdatePost.safeParse({
      title_en: formData.get('title_en'),
      title_ja: formData.get('title_ja'),
      title_kr: formData.get('title_kr'),
      title_hk: formData.get('title_hk'),
      thumbnail_img: formData.get('thumbnail_img'),
      tags: formData.get('tags'),
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
      updatePost(id, thumbnail_img, title_en, postContent_en, 'en', client),
      updatePost(id, thumbnail_img, title_ja, postContent_ja, 'ja', client),
      updatePost(id, thumbnail_img, title_kr, postContent_kr, 'kr', client),
      updatePost(id, thumbnail_img, title_hk, postContent_hk, 'hk', client),
    ]);
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to update post',
    };
  }

  const urlRegex = /\s/g;
  // TODO: direct to current locale
  const title_en = formData.get('title_en') as string;
  const url_title = title_en.toLowerCase().replace(urlRegex, '-');
  const redirectUrl = `/posts/${url_title}/${id}`;

  revalidatePath(redirectUrl);
  redirect(redirectUrl);
}
