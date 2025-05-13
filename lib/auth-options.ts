import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { UserModel } from "@/models/user"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Special case for demo accounts
        if (
          (credentials.email === "demo@example.com" && credentials.password === "password") ||
          (credentials.email === "ben@raffily.com" && credentials.password === "password")
        ) {
          return {
            id: credentials.email === "ben@raffily.com" ? "ben-raffily-demo" : "demo-user",
            email: credentials.email,
            name: credentials.email === "ben@raffily.com" ? "Ben Raffily" : "Demo User",
            role: "merchant",
          }
        }

        // Regular authentication for real users
        const user = await UserModel.authenticate(credentials.email, credentials.password)

        if (!user) {
          return null
        }

        return {
          id: user._id!.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
}

