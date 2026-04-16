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
    const highlights = await prisma.communityHighlights.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(highlights);
  } catch (error) {
    console.error(error);
    return internalServerError(error);
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return unauthorized();
  }
  try {
    // const highlight = await prisma.communityHighlights.create();
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

  try {
    // const deletedHighlight = await prisma.communityHighlights.delete({})
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
    // const updatedHighlight = await prisma.communityHighlights.update({});
    return ok();
  } catch (error) {
    console.error(error);
    return internalServerError(error);
  }
}
