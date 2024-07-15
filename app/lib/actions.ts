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
  title: z.string({
    invalid_type_error: 'Please enter a title.',
  }),
  thumbnail_img: z.string({
    invalid_type_error: 'Please enter a thumbnail image.',
  }),
  tags: z.string({
    invalid_type_error: 'Please enter tags.',
  }),
  content: z.string({
    invalid_type_error: 'Please enter content.',
  }),
  modify_date: z.string(),
});

const CreatePost = FormSchema.omit({ id: true, modify_date: true });
const UpdatePost = FormSchema.omit({ id: true, modify_date: true });

export type State = {
  errors?: {
    id?: string[];
    title?: string[];
    thumbnail_img?: string[];
    tags?: string[];
    content?: string[];
  };
  message?: string | null;
};

export async function createPost(client: VercelPoolClient, prevState: State, formData: FormData, locale: string) {

  // Validate form fields using Zod
  const validatedFields = CreatePost.safeParse({
    title: formData.get('title'),
    thumbnail_img: formData.get('thumbnail_img'),
    tags: formData.get('tags'),
    content: formData.get('content'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Post.',
    };
  }

  // Prepare data for insertion into the database
  const { title, thumbnail_img, tags, content } = validatedFields.data;
  const create_date = new Date().toISOString().split('T')[0];
  const modify_date = create_date;
  const author = keyName;
  const comment_id_list: string[] = [];
  const likes = 0;
  const id = require('uuid').v4();
  console.log("post id: " + id);

  // Insert data into the database
  try {
    const createPostQuery = format(
      `
      INSERT INTO posts_%s (id, title, thumbnail_img, tags, content, author, comment_id_list, create_date, modify_date, likes)
      VALUE (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L)
      ON CONFLICT (id) DO NOTHING
      `,
      locale,
      id,
      title,
      thumbnail_img,
      tags,
      content,
      author,
      comment_id_list,
      create_date,
      modify_date,
      likes
    );

    const createPost = await client.query(createPostQuery);
    
    revalidatePath('/');
    redirect('/');
    return { message: 'Post created successfully' };
  } catch (error) {
    return { message: 'Failed to create post' };
  }
}
    
export async function updatePost(id: string, locale: string, prevState: State, formData: FormData) {
  //log
  console.log("updatePost");

  const client = await db.connect();


  const validatedFields = UpdatePost.safeParse({
    title: formData.get('title'),
    thumbnail_img: formData.get('thumbnail_img'),
    tags: formData.get('tags'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Post.',
    };
  }

  const { title, thumbnail_img, tags, content } = validatedFields.data;
  const modify_date = new Date().toISOString().split('T')[0];

  try {
    const updatePostQuery = format(
      `
      UPDATE posts_%s
      SET title = %L, thumbnail_img = %L, tags = %L, content = %L, modify_date = %L
      WHERE id = %L
      `,
      locale,
      title,
      thumbnail_img,
      tags,
      content,
      modify_date,
      formData.get('id')
    );

    const updatePost = await client.query(updatePostQuery);

    revalidatePath('/');
    redirect('/');
    return { message: 'Post updated successfully' };
  } catch (error) {
    return { message: 'Failed to update post' };
  }
}