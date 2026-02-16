import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const sponsors = prisma.sponsor.findMany();
  return NextResponse.json(sponsors);
}
