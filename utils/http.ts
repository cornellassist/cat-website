import { NextResponse } from "next/server";

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
}

export function created() {
  return NextResponse.json({ success: true }, { status: 201 });
}

export function internalServerError(error: any) {
  return NextResponse.json({ error: error }, { status: 500 });
}

export function ok() {
  return NextResponse.json({ success: true }, { status: 200 });
}

export function deleted() {
  return NextResponse.json(null, { status: 204 });
}
