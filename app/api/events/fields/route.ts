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
      console.log(eventModel.fields);

      const fields = eventModel.fields
        .filter((f) => f.name !== "id")
        .map((f) => {
          return {
            name: f.name,
            type: f.name === "tags" ? f.type + "[]" : f.type,
          };
        });
      return NextResponse.json(fields);
    } else {
      throw new Error("eventModel is undefined");
    }
  } catch (error) {
    console.error(error);
    return internalServerError(error);
  }
}
