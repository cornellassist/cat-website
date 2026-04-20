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
// import { checkAuth } from "@/utils/checkAuth";
// since we have to make supabase client anyway for storage

export async function GET(request: NextRequest) {
  // wasnt working because of policies
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return unauthorized();
  }
  try {
    const { searchParams } = new URL(request.url); // no json body for GET, use URL object to find param in url instead
    const folderName = searchParams.get("folderName");
    if (!folderName) {
      return NextResponse.json({ error: "Incorrect params" }, { status: 400 });
    }
    const { data, error } = await supabase.storage
      .from("cat-website-pics")
      .list(folderName, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
    if (error) throw error;
    // console.log(data);
    const res = data
      ?.filter((item) => item.id !== null)
      .map((item) => item.name);
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return internalServerError(error);
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user) {
    return unauthorized();
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File; // data, not param
    const folder = formData.get("folder") as string;
    const name = file.name.replace(/[^a-zA-Z0-9._-]/g, "_"); // sanitize
    const { data, error } = await supabase.storage
      .from("cat-website-pics")
      .upload(`${folder}/${name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) throw error;
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
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get("fileName");
    const folder = searchParams.get("folder");
    const { data, error } = await supabase.storage
      .from("cat-website-pics")
      .remove([`${folder}/${fileName}`]);
    if (error) throw error;
    return ok();
  } catch (error) {
    console.log(error);
    return internalServerError(error);
  }
}
