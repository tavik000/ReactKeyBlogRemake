import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import { authConfig } from './auth.config';
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

async function getUser(name: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE name=${name}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut, handlers: { GET, POST }, } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),

    // not use credentials
    // Credentials({
    //   async authorize(credentials) {
    //     const parsedCredentials = z
    //       .object({ email: z.string().email(), password: z.string().min(6) })
    //       .safeParse(credentials);

    //     if (parsedCredentials.success) {
    //       const { email, password } = parsedCredentials.data;

    //       const user = await getUser(email);
    //       if (!user) return null;

    //       if (user.password) {
    //         const passwordsMatch = await bcrypt.compare(password, user.password);
    //         if (passwordsMatch) return user;
    //       }
    //       console.log('Invalid credentials');
    //       return null;
    //     }

    //     console.log('Invalid credentials');
    //     return null;
    //   },
    // }),
  ],
});
