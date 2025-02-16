"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function handleGetStarted() {
  const session = await auth();

  if (session) {
    redirect("/questionnaire");
  } else {
    redirect("/login");
  }
}
