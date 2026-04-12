import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    // if the user not found
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }
  const body = await request.json();

  const project = await prisma.project.create({
    data: { title: "hi", descrip: "hi", descrip2: "bruh", imageUrls: ["", ""] },
  });
  console.log(project);

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();

  const body = await request.json();

  return;
}
