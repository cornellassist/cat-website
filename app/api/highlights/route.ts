import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const highlights = await prisma.communityHighlights.findMany();
  return NextResponse.json(highlights);
}
