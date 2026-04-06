import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() { //handler
  const events = await prisma.event.findMany();
  return NextResponse.json(events);
}
