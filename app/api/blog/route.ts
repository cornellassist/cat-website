import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import {
  unauthorized,
  created,
  internalServerError,
  ok,
  deleted,
} from "@/utils/http";

export async function GET() {
  const blog = await prisma.blog.findMany();
  // order by date
  return NextResponse.json(blog);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient(); // so that cookies are tied with incoming request
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return unauthorized();
  }

  const body = await request.json();
  try {
    await prisma.blog.create({ data: body });
    return created();
  } catch (error) {
    console.error(error);
    return internalServerError(error);
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return unauthorized();
  }
  const body = await request.json();

  try {
    const deletedBlog = prisma.blog.delete({ where: { id: 100 } }); // placeholder id
    console.log(deletedBlog);
    return deleted();
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
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
    // const updatedBlog = prisma.blog.update({ where {id: 100}, data: """});
    return ok();
  } catch (error) {
    console.error(error);
    return internalServerError(error);
  }
}
