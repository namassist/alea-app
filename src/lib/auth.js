import { db } from "./db";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });
        if (!existingUser) {
          return null;
        }

        const matchedPassword = await compare(
          credentials?.password,
          existingUser.password
        );
        if (!matchedPassword) {
          return null;
        }

        return {
          id: `${existingUser?.id}`,
          username: existingUser?.username,
          email: existingUser?.email,
          role: existingUser?.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          role: user.role,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            username: token.username,
            role: token.role,
          },
        };
      }
      return session;
    },
  },
};
