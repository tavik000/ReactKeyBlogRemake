const { db } = require('@vercel/postgres');
const {
  post_tags,
  posts_en,
  posts_ja,
  posts_kr,
  posts_hk: posts_hk,
  users,
  comments,
  notifications,
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
        email TEXT,
        img VARCHAR(255) NOT NULL,
        theme VARCHAR(255) NOT NULL,
        last_login_date DATE NOT NULL,
        create_date DATE NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        // const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, img, theme, last_login_date, create_date)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.img}, ${user.theme}, ${user.last_login_date}, ${user.create_date})
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
        tags VARCHAR(255)[] NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        comment_id_list VARCHAR(255)[] NOT NULL,
        create_date DATE NOT NULL,
        modify_date DATE NOT NULL,
        likes VARCHAR(255)[] NOT NULL
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
      case 'hk':
        posts = posts_hk;
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
          INSERT INTO posts_%s (id, title, thumbnail_img, tags, content, author, comment_id_list, create_date, modify_date, likes)
          VALUES ('${post.id}', '${post.title}', '${post.thumbnail_img}', ARRAY[%L]::VARCHAR[], '${post.content}', '${post.author}', ARRAY[%L]::VARCHAR[], '${post.create_date}', '${post.modify_date}', ARRAY[%L]::VARCHAR[])
          ON CONFLICT (id) DO NOTHING;
          `,
          locale,
          post.tags,
          post.comment_id_list,
          post.likes,
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
        user_name VARCHAR(255) NOT NULL,
        user_img VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        create_date DATE NOT NULL,
        modify_date DATE NOT NULL,
        likes VARCHAR(255)[] NOT NULL
      );
    `;

    console.log(`Created "comments" table`);

    const insertedComments = await Promise.all(
      comments.map((comment) => {
        const insertCommentTableQuery = format(
          `   
          INSERT INTO comments (id, post_id, user_name, user_img, content, create_date, modify_date, likes)
          VALUES (%L, %L, %L, %L, %L, %L, %L, ARRAY[%L]::VARCHAR[])
          ON CONFLICT (id) DO NOTHING;
          `,
          comment.id,
          comment.post_id,
          comment.user_name,
          comment.user_img,
          comment.content,
          comment.create_date,
          comment.modify_date,
          comment.likes
        );
        return client.query(insertCommentTableQuery);
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

async function seedNotifications(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS notifications (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      source_user_name VARCHAR(255) NOT NULL,
      source_user_img VARCHAR(255) NOT NULL,
      target_user_name VARCHAR(255) NOT NULL,
      post_id UUID NOT NULL,
      post_title VARCHAR(255) NOT NULL,
      comment_id UUID,
      comment_content TEXT,
      type VARCHAR(255) NOT NULL,
      source_locale VARCHAR(255) NOT NULL,
      create_date DATE NOT NULL,
      is_read BOOLEAN NOT NULL
    );
  `;

    console.log(`Created "notifications" table`);

    const insertedNotifications = await Promise.all(
      notifications.map((notification) => {
        return client.sql`
          INSERT INTO notifications (id, source_user_name, source_user_img, target_user_name, post_id, post_title, comment_id, comment_content, type, source_locale, create_date, is_read)
          VALUES (
            ${notification.id}, 
            ${notification.source_user_name}, 
            ${notification.source_user_img}, 
            ${notification.target_user_name}, 
            ${notification.post_id}, 
            ${notification.post_title}, 
            ${notification.comment_id ?? null}, 
            ${notification.comment_content ?? null}, 
            ${notification.type}, 
            ${notification.source_locale}, 
            ${notification.create_date}, 
            ${notification.is_read}
          )
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log(`Seeded ${insertedNotifications.length} notifications`);

    return {
      createTable,
      notifications: insertedNotifications,
    };
  } catch (error) {
    console.error('Error seeding notifications:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedPostTags(client);
  await seedPosts(client, 'en');
  await seedPosts(client, 'ja');
  await seedPosts(client, 'hk');
  await seedPosts(client, 'kr');
  await seedComments(client);
  await seedNotifications(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
