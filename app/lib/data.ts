import { sql, db } from '@vercel/postgres';
import { User, } from './definitions';
import { Post, PostCard, PostComment } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import format from 'pg-format';

export async function fetchPostTags() {
  noStore();

  try {
    const result = await sql<{
      name: any;
      tags: string[];
    }>`
    SELECT DISTINCT name,
      CASE 
        WHEN name = 'UE5' THEN -1
        WHEN name LIKE 'O%' THEN 3 
        WHEN name LIKE 'G%' THEN 2 
        WHEN name LIKE 'R%' THEN 1 
        ELSE 0 
      END AS order_column
    FROM post_tags
    ORDER BY order_column, name
    `;
    const tags = result.rows.map((row) => row.name);
    return tags;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post tags.');
  }
}

const ITEMS_PER_PAGE: number = 9;
export async function fetchFilteredPosts(
  tag: string,
  query: string,
  currentPage: number,
  locale: string,
) {
  noStore();

  const offset: number = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log(
    'fetchFilteredPosts, tag: ' +
    tag +
    ', query: ' +
    query +
    ', offset: ' +
    offset,
  );

  try {
    let posts;
    if (tag) {
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
            (title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`})
            AND ${tag} IN (SELECT value FROM UNNEST(tags) AS value)
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
          FROM posts_ja
          WHERE
            (title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`})
            AND ${tag} IN (SELECT value FROM UNNEST(tags) AS value)
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
            (title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`})
            AND ${tag} IN (SELECT value FROM UNNEST(tags) AS value)
          ORDER BY create_date DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset} 
        `;
          break;
        case 'hk':
          posts = await sql<PostCard>`
          SELECT
            id,
            title,
            thumbnail_img,
            tags,
            create_date
          FROM posts_hk
          WHERE
            (title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`})
            AND ${tag} IN (SELECT value FROM UNNEST(tags) AS value)
          ORDER BY create_date DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset} 
        `;
          break;
        default:
          throw new Error('Unsupported locale.');
      }
    } else {
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
            content ILIKE ${`%${query}%`} OR
            EXISTS (
              SELECT 1
              FROM UNNEST(tags) AS tag
              WHERE tag ILIKE ${`%${query}%`}
            )
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
          FROM posts_ja
          WHERE
            title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`} OR
            EXISTS (
              SELECT 1
              FROM UNNEST(tags) AS tag
              WHERE tag ILIKE ${`%${query}%`}
            )
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
            content ILIKE ${`%${query}%`} OR
            EXISTS (
              SELECT 1
              FROM UNNEST(tags) AS tag
              WHERE tag ILIKE ${`%${query}%`}
            )
          ORDER BY create_date DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset} 
        `;
          break;
        case 'hk':
          posts = await sql<PostCard>`
          SELECT
            id,
            title,
            thumbnail_img,
            tags,
            create_date
          FROM posts_hk
          WHERE
            title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`} OR
            EXISTS (
              SELECT 1
              FROM UNNEST(tags) AS tag
              WHERE tag ILIKE ${`%${query}%`}
            )
          ORDER BY create_date DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset} 
        `;
          break;
        default:
          throw new Error('Unsupported locale.');
      }
    }
    return posts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    console.log('offset: ' + offset + ', query: ' + query);
    throw new Error('Failed to fetch filtered posts.');
  }
}

export async function isValidUser(name: string, email: string): Promise<boolean> {
  noStore();
  try {
    const result = await sql`
    SELECT * FROM users WHERE name=${name} AND email=${email}
  `;
    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to validate user.');
  }
}

export async function fetchUser(name: string, email: string): Promise<User> {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE name=${name} AND email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchPostsPages(
  tag: string,
  query: string,
  locale: string,
) {
  noStore();
  try {
    let count;
    if (tag) {
      switch (locale) {
        case 'en':
          count = await sql`SELECT COUNT(*)
          FROM posts_en
          WHERE
            (title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`})
            AND ${tag} IN (SELECT value FROM UNNEST(tags) AS value)
        `;
          break;
        case 'ja':
          count = await sql`SELECT COUNT(*)
          FROM posts_ja
          WHERE
            (title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`})
            AND ${tag} IN (SELECT value FROM UNNEST(tags) AS value)
        `;
          break;
        case 'kr':
          count = await sql`SELECT COUNT(*)
          FROM posts_kr
          WHERE
            (title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`})
            AND ${tag} IN (SELECT value FROM UNNEST(tags) AS value)
        `;
          break;
        case 'hk':
          count = await sql`SELECT COUNT(*)
          FROM posts_hk
          WHERE
            (title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`})
            AND ${tag} IN (SELECT value FROM UNNEST(tags) AS value)
        `;
          break;
        default:
          throw new Error('Unsupported locale.');
      }
    } else {
      switch (locale) {
        case 'en':
          count = await sql`SELECT COUNT(*)
          FROM posts_en
          WHERE
            title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`} OR
            EXISTS (
              SELECT 1
              FROM UNNEST(tags) AS tag
              WHERE tag ILIKE ${`%${query}%`}
            )
        `;
          break;
        case 'ja':
          count = await sql`SELECT COUNT(*)
          FROM posts_ja
          WHERE
            title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`} OR
            EXISTS (
              SELECT 1
              FROM UNNEST(tags) AS tag
              WHERE tag ILIKE ${`%${query}%`}
            )
        `;
          break;
        case 'kr':
          count = await sql`SELECT COUNT(*)
          FROM posts_kr
          WHERE
            title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`} OR
            EXISTS (
              SELECT 1
              FROM UNNEST(tags) AS tag
              WHERE tag ILIKE ${`%${query}%`}
            )
        `;
          break;
        case 'hk':
          count = await sql`SELECT COUNT(*)
          FROM posts_hk
          WHERE
            title ILIKE ${`%${query}%`} OR
            content ILIKE ${`%${query}%`} OR
            EXISTS (
              SELECT 1
              FROM UNNEST(tags) AS tag
              WHERE tag ILIKE ${`%${query}%`}
            )
        `;
          break;
        default:
          throw new Error('Unsupported locale.');
      }
    }

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of posts.');
  }
}

export async function fetchPostById(id: string, locale: string) {
  noStore();

  // await new Promise((resolve) => setTimeout(resolve, 30000));
  try {
    let data;

    switch (locale) {
      case 'en':
        data = await sql<Post>`
          SELECT
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
          FROM posts_en
          WHERE id=${id};
        `;
        break;
      case 'ja':
        data = await sql<Post>`
            SELECT
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
            FROM posts_ja
            WHERE id=${id};
          `;
        break;
      case 'kr':
        data = await sql<Post>`
            SELECT
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
            FROM posts_kr
            WHERE id=${id};
          `;
        break;
      case 'hk':
        data = await sql<Post>`
            SELECT
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
            FROM posts_hk
            WHERE id=${id};
          `;
        break;
      default:
        throw new Error('Unsupported locale.');
    }

    let post = data.rows[0];
    // console.log('post:', post);

    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post.');
  }
}

export async function fetchPostCommentByPostId(postId: string) {
  noStore();

  console.log('fetchPostCommentByPostId, postId: ' + postId);

  try {
    const data = await sql<PostComment[]>`
    SELECT
      id,
      post_id,
      user_name,
      user_img,
      content,
      create_date,
      modify_date,
      likes
    FROM comments
    WHERE post_id=${postId};
  `;
    const comments = data.rows;
    return comments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post comments.');
  }
}


export async function fetchAllNotificationByTargetUserName(targetUserName: string) {
  noStore();

  console.log('fetchAllNotificationByTargetUserName, targetUserName: ' + targetUserName);

  try {
    const data = await sql<Notification>`
    SELECT
      id,
      source_user_name,
      source_user_img,
      target_user_name,
      post_id,
      post_title,
      comment_id,
      comment_content,
      type,
      source_locale,
      create_date,
      is_read
    FROM notifications
    WHERE target_user_name=${targetUserName}
    ORDER BY create_date DESC
  `;
    const notifications = data.rows;
    return notifications;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch notifications.');
  }
}
