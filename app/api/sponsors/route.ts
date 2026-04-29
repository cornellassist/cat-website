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
  try {
    const sponsors = await prisma.sponsor.findMany();
    return NextResponse.json(sponsors);
  } catch (error) {
    console.error(error);
    return internalServerError(error);
  }
  
}

export async function POST(request: NextRequest) {
  const supabase = await createClient(); // so that cookies are tied with incoming request
  const { data: {user} } = await supabase.auth.getUser();

  if (!user) {
    return unauthorized(); // NextResponse.json({error: "Unauthorized"}, {status: 400})
  }

  // note: check if this is right input
  const body = await request.json();
  try {
    await prisma.sponsor.create({ data: body});
    return created();
  } catch (error) {
    console.error(error);
    return internalServerError(error); 
  }
}

// techincally not finished
export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return unauthorized();
  }
  // also check this
  const body = await request.json();

  try {
    const deletedSponsor = prisma.sponsor.delete({ where: { id: 100 } }); // placeholder id
    console.log(deletedSponsor);
    return deleted();
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// techinically not finished
export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return unauthorized();
  }

  try {
    // const updatedSponser = prisma.sponser.update({ });
    return ok();
  } catch (error) {
    console.error(error);
    return internalServerError(error);
  }
}
