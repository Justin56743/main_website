"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function saveAssessmentResponse(answers: number[], cluster: number, traits: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  try {
    const response = await prisma.assessmentResponse.create({
      data: {
        userId: session.user.id,
        answers: answers,
        cluster: cluster,
        traits: traits,
      },
    });
    return response;
  } catch (error) {
    console.error("Error saving assessment response:", error);
    throw new Error("Failed to save assessment response");
  }
} 