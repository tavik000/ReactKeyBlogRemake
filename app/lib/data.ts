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

// export async function connectDatabase() {
//   let retries = 5;
//   while (retries) {
//     try {
//       const client = await db.connect();
//       // Your database query code here...
//       return client;
//     } catch (error) {
//       console.error('Database Error:', error);
//       retries -= 1;
//       console.log(`Retries left: ${retries}`);
//       if (!retries) throw new Error('Failed to connect to the database.');
//       // Wait for 1 second before retrying
//       await new Promise((res) => setTimeout(res, 1000));
//     }
//   }
// }

const ITEMS_PER_PAGE: number = 9;
export async function fetchFilteredPosts(
  query: string,
  currentPage: number,
  locale: string,
) {
  console.log('fetchFilteredPosts');
  noStore();

  const offset: number = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    var posts;
    switch (locale) {
      case 'en':
        posts = await sql<PostCard>`
          SELECT
            id,
            title,
            thumbnail_img,
            tags,
            create_date
          FROM posts_en
          WHERE
            title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`}
          ORDER BY create_date DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset} 
        `;
        break;
      case 'ja':
        posts = await sql<PostCard>`
          SELECT
            id,
            title,
            thumbnail_img,
            tags,
            create_date
          FROM posts_jp
          WHERE
            title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`}
          ORDER BY create_date DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset} 
        `;
        break;
      case 'kr':
        posts = await sql<PostCard>`
          SELECT
            id,
            title,
            thumbnail_img,
            tags,
            create_date
          FROM posts_kr
          WHERE
            title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`}
          ORDER BY create_date DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset} 
        `;
      case 'zh':
        posts = await sql<PostCard>`
          SELECT
            id,
            title,
            thumbnail_img,
            tags,
            create_date
          FROM posts_zh
          WHERE
            title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`}
          ORDER BY create_date DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset} 
        `;
      default:
        throw new Error('Unsupported locale.');
    }
    return posts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    console.log('offset: ' + offset + ', query: ' + query);
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
