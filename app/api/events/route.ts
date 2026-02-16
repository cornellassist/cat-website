import prisma from "@/utils/prisma";
import { Event as EventType } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const events: EventType[] = await prisma.event.findMany();
  return NextResponse.json(events);
}
