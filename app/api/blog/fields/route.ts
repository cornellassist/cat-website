import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET() {
  // doesnt have be to be async
  try {
    const [blogModel] = Prisma.dmmf.datamodel.models.filter(
      (m) => m.name === "Blog",
    );
    const blogFields = blogModel.fields
      .filter((b) => b.name !== "id" && b.name !== "slug") // no slug
      .map((b) => {
        return { name: b.name, type: b.type };
      });
    return NextResponse.json(blogFields);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
