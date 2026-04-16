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
  const supabase = await createClient(); // so that cookies are tied with incoming request
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
  }

  const body = await request.json();
  try {
    const event = await prisma.event.create({
      // use same central prisma object, not dependent per-request
      data: {
        id: 1,
        title: "hi",
        tags: ["Kids"],
        descrip: "hi",
        date: "date",
        time: "time",
        location: "location",
        imageUrl: "image",
      },
    });
    console.log(event);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }
  const body = await request.json();

  try {
    const deletedEvent = prisma.event.delete({ where: { id: 100 } }); // placeholder id
    console.log(deletedEvent);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
