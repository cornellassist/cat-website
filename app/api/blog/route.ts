import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const blog = await prisma.blog.findMany();
    // order by date
    return NextResponse.json(blog);
}