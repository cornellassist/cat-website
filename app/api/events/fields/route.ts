import prisma from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";
import {
  unauthorized,
  created,
  internalServerError,
  ok,
  deleted,
} from "@/utils/http";
import { Prisma } from "@prisma/client";

// Header, body/data, URL (path and params)
export async function GET(request: NextRequest) {
  try {
    const [eventModel] = Prisma.dmmf.datamodel.models.filter(
      (m) => m.name === "Event",
    );
    if (eventModel) {
      const fields = eventModel.fields
        .filter((f) => f.name !== "id" && f.name !== "tags") // tags manually handled in frontend custom component
        .map((f) => {
          // console.log(f);
          return {
            name: f.name,
            type: f.type,
            isRequired: !f.hasDefaultValue || f.isRequired,
          };
        });
      // console.log(fields);
      return NextResponse.json(fields);
    } else {
      throw new Error("eventModel is undefined");
    }
  } catch (error) {
    console.error(error);
    return internalServerError(error);
  }
}
