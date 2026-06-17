import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import {
  unauthorized,
  created,
  internalServerError,
  ok,
  deleted,
} from "@/utils/http";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return internalServerError(error);
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    // if the user not found
    return unauthorized();
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

    return created(); // http status codes
  } catch (error) {
    console.error(error);
    return internalServerError(error);
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient(); // create server supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return unauthorized();
  }

  try {
    const deleteProject = await prisma.project.delete({
      where: { id: 8 },
    });
    console.log(deleteProject);
    return deleted();
  } catch (error) {
    console.error(error);
    return internalServerError(error);
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return unauthorized();
  }

  try {
    const { id, field, value } = await request.json();
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { [field]: value },
    });
    return ok();
  } catch (error) {
    console.error(error);
    return internalServerError(error);
  }
}
