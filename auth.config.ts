import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnEditOrCreatePage = nextUrl.pathname.endsWith('/edit') || nextUrl.pathname.endsWith('/create');
      console.log("isLoggedin, isOnEditOrCreatePage, nextUrl, auth", isLoggedIn, isOnEditOrCreatePage, nextUrl, auth);
      if (isOnEditOrCreatePage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        const lang = nextUrl.pathname.split('/')[1];
        return Response.redirect(new URL(`/${lang}/`, nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
