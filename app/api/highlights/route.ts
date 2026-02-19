import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const highlights = await prisma.communityHighlights.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(highlights);
}
