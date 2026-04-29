import { NextResponse, NextRequest } from "next/server";
import {
  unauthorized,
  created,
  internalServerError,
  ok,
  deleted,
} from "@/utils/http";
import { createClient } from "@/utils/supabase/server";
import { checkAuth } from "@/utils/checkAuth";
import prisma from "@/utils/prisma";

export async function GET() {
  const roleOrder = {
    TEAM_LEADS: 0,
    ENGINEERING_LEADS: 1,
    OUTREACH_EDU_LEADS: 2,
    OPERATIONS_LEADS: 3,
    ENGINEERING: 4,
    OUTREACH_EDU: 5,
    OPERATIONS: 6,
  };
  try {
    const member = await prisma.member.findMany({
      orderBy: { role: "asc" },
    });
    member.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
    return NextResponse.json(member);
  } catch (error) {
    console.log(error);
    return internalServerError(error);
  }
}

export async function POST(request: NextRequest) {
  const user = await checkAuth();
  if (!user) {
    return unauthorized();
  }

  try {
    // const newMember = await prisma.member.create();
    return created();
  } catch (error) {
    return internalServerError(error);
  }
}

export async function DELETE(request: NextRequest) {
  const user = await checkAuth();
  if (!user) {
    return unauthorized();
  }

  try {
    // const deletedMember = await prisma.member.delete();
    return deleted();
  } catch (error) {
    return internalServerError(error);
  }
}

export async function PATCH(request: NextRequest) {
  const user = await checkAuth();
  if (!user) {
    return unauthorized();
  }

  try {
    // const updatedMember = await prisma.member.update();
    return ok();
  } catch (error) {
    return internalServerError(error);
  }
}
