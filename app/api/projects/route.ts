import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(projects);
}
