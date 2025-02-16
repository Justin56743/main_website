// app/api/auth-check/route.js

import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (session) {
    return Response.json({ redirect: '/dashboard' });
  } else {
    return Response.json({ redirect: '/login' });
  }
}