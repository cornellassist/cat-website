import { internalServerError } from "@/utils/http";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [membersModel] = Prisma.dmmf.datamodel.models.filter(
      (m) => m.name === "Member",
    );
    if (membersModel) {
      const fields = membersModel.fields
        .filter((f) => f.name !== "id")
        .map((f) => {
          return { name: f.name, type: f.type };
        });
      return NextResponse.json(fields);
    } else {
      throw new Error("highlightModel is undefined");
    }
  } catch (error) {
    return internalServerError(error);
  }
}
