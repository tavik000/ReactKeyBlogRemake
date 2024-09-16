// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  twitter?: string;
  password?: string;
};

export interface PostComment {
  id: string;
  post_id: string;
  user_name: string;
  user_img: string;
  content: string;
  create_date: Date;
  modify_date: Date;
  likes: number;
}

export type PostCard = {
  id: string;
  title: string;
  thumbnail_img: string;
  tags: string[];
  create_date: Date;
  modify_date: Date;
};

export type Post = {
  id: string;
  title: string;
  thumbnail_img: string;
  tags: string[];
  content: string;
  author: string;
  comment_id_list: string[];
  create_date: Date;
  modify_date: Date;
  likes: number;
};

