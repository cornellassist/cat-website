import prisma from "@/utils/prisma";
import { CommunityHighlights as CommunityHighlightType } from "@/app/generated/prisma/client";
import { NextResponse } from 'next/server';


export async function GET() {
    const highlights: CommunityHighlightType[] = await prisma.communityHighlights.findMany();
    return NextResponse.json(highlights);
}
