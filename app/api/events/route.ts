import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { json } from "stream/consumers";


export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return NextResponse.json( {error: "Unauthorized User"}, {status: 401} );
  }

  const body = await request.json();

  await prisma.event.create({data: {id: 1, title: "hi", tags: ["Kids"], descrip: "hi", date: "date", time: "time", location: "location", imageUrl: "image"}});

  return NextResponse.json( {success: true}, {status: 200} )
}

export async function DELETE() {
  const supabase = await createClient();
}