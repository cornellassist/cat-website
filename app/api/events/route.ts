import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(events);
}
