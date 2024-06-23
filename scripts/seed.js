const { db } = require('@vercel/postgres');
const {
  post_tags,
  posts_en,
  posts_ja,
  posts_kr,
  posts_zh,
  users,
  comments,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');
const format = require('pg-format');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedPostTags(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS post_tags (
        name VARCHAR(255) PRIMARY KEY
      );
    `;

    console.log(`Created "post_tags" table`);

    const insertedPostTags = await Promise.all(
      post_tags.map(async (tag) => {
        return client.sql`
          INSERT INTO post_tags (name)
          VALUES (${tag.name})
          ON CONFLICT (name) DO NOTHING;
        `;
      }),
    );

    console.log(`Seeded ${insertedPostTags.length} post tags`);

    return {
      createTable,
      postTags: insertedPostTags,
    };
  } catch (error) {
    console.error('Error seeding post tags:', error);
    throw error;
  }
}

async function seedPosts(client, locale) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createPostTableQuery = format(
      `
      CREATE TABLE IF NOT EXISTS posts_%s (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT NOT NULL,
        thumbnail_img VARCHAR(255) NOT NULL,
        tag VARCHAR(255)[] NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        comment_id_list VARCHAR(255)[] NOT NULL,
        create_date DATE NOT NULL
      );
    `,
      locale,
    );

    const createTable = await client.query(createPostTableQuery);

    console.log(`Created "posts_${locale}" table`);

    var posts;

    switch (locale) {
      case 'en':
        posts = posts_en;
        break;
      case 'ja':
        posts = posts_ja;
        break;
      case 'zh':
        posts = posts_zh;
        break;
      case 'kr':
        posts = posts_kr;
        break;
      default:
        locale = 'en';
        posts = posts_en;
        break;
    }
    const insertedPosts = await Promise.all(
      posts.map(async (post) => {
        const insertPostTableQuery = format(
          `
          INSERT INTO posts_%s (id, title, thumbnail_img, tag, content, author, comment_id_list, create_date)
          VALUES ('${post.id}', '${post.title}', '${post.thumbnail_img}', ARRAY[%L]::VARCHAR[], '${post.content}', '${post.author}', ARRAY[%L]::VARCHAR[], '${post.create_date}')
          ON CONFLICT (id) DO NOTHING;
          `,
          locale,
          post.tag.join(', '),
          post.comments.join(', '),
        );

        return client.query(insertPostTableQuery);
      }),
    );

    console.log(`Seeded ${insertedPosts.length} posts`);

    return {
      createTable,
      posts: insertedPosts,
    };
  } catch (error) {
    console.error('Error seeding posts:', error);
    throw error;
  }
}

async function seedComments(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS comments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        post_id UUID NOT NULL,
        author VARCHAR(255) NOT NULL,
        author_img VARCHAR(255) NOT NULL,
        author_email VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        create_date DATE NOT NULL
      );
    `;

    console.log(`Created "comments" table`);

    const insertedComments = await Promise.all(
      comments.map((comment) => {
        return client.sql`
          INSERT INTO comments (id, post_id, author, author_img, author_email, content, create_date)
          VALUES (${comment.id}, ${comment.post_id}, ${comment.author}, ${comment.author_img}, ${comment.author_email}, ${comment.content}, ${comment.create_date})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log(`Seeded ${insertedComments.length} comments`);

    return {
      createTable,
      comments: insertedComments,
    };
  } catch (error) {
    console.error('Error seeding comments:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedPostTags(client);
  await seedPosts(client, 'en');
  await seedPosts(client, 'ja');
  await seedPosts(client, 'zh');
  await seedPosts(client, 'kr');
  await seedComments(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
