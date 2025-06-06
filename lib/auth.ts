import NextAuth from "next-auth"
import Google from "next-auth/providers/google" 
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, GitHub],
  pages: {
    signIn: "/login", // Your custom login page route
  }
})