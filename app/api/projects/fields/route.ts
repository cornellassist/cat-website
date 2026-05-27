import { internalServerError } from "@/utils/http";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [projectModel] = Prisma.dmmf.datamodel.models.filter(
      (m) => m.name === "Project",
    );
    if (projectModel) {
      const fields = projectModel.fields
        .filter((f) => f.name !== "id")
        .map((f) => {
          return {
            name: f.name,
            type: f.type,
          };
        });
      return NextResponse.json(fields);
    } else {
      throw new Error("projects model not found");
    }
  } catch (error) {
    return internalServerError(error);
  }
}
