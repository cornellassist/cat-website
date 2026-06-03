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
        .filter(
          (f) =>
            f.name !== "id" && f.name !== "imageUrls" && f.name !== "imageAlts",
        )
        .map((f) => {
          // console.log(f);
          return {
            name: f.name,
            type: f.type,
            isRequired: !f.hasDefaultValue || f.isRequired, // doesnt work yet
          };
        });
      // console.log(fields);
      return NextResponse.json(fields);
    } else {
      throw new Error("projects model not found");
    }
  } catch (error) {
    return internalServerError(error);
  }
}
