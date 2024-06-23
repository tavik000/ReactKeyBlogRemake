import { sql, db } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions_backup';
import { Post, PostCard, BlogComment } from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import format from 'pg-format';

const ITEMS_PER_PAGE: number = 9;
export async function fetchFilteredPosts(
  query: string,
  currentPage: number,
  locale: string,
) {
  noStore();
  const client = await db.connect();
  const offset: number = (currentPage - 1) * ITEMS_PER_PAGE;

    const selectPostsQuery = format(
      `
      SELECT
        id,
        title,
        thumbnail_img,
        tags,
        create_date
      FROM posts_%I
      WHERE
        title ILIKE %L OR
        content ILIKE %L
      ORDER BY create_date DESC
      LIMIT %L OFFSET %L
      `,
      locale,
      `%${query}%`,
      `%${query}%`,
      ITEMS_PER_PAGE,
      offset
    );

  try {
    const posts = await client.query<PostCard>(selectPostsQuery);

    return posts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered posts.');
  }
}


export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
