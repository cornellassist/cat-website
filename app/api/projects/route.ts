import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { id: "asc" },
  });
  console.log("hi");
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

  try {
    const project = await prisma.project.create({
      data: {
        title: "hi",
        descrip: "hi",
        descrip2: "bruh",
        imageUrls: ["", ""],
      },
    });
    console.log(project);

    return NextResponse.json({ success: true }, { status: 201 }); // http status codes
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient(); // create server supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
  }

  try {
    const deleteProject = await prisma.project.delete({
      where: { id: 8 },
    });
    console.log(deleteProject);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
