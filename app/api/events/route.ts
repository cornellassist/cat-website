import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: {id: "asc"}
  });
  return NextResponse.json(events);
}
