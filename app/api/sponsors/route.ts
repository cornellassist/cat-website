import prisma from "@/utils/prisma";
import { Sponsor as SponsorType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const sponsors = prisma.sponsor.findMany();
  return NextResponse.json(sponsors);
}
