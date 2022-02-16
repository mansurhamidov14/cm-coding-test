import type { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { User } from "next-auth";
import userService from "../../../lib/userService";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
        CredentialsProvider({
            name: 'Login form',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'johndoe' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize (credentials, req) {
                if (credentials) {
                    const user = await userService.getByCredentials(credentials);
                    if (user) {
                        return user as User;
                    }
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.user = token.user as User;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
  })
}
