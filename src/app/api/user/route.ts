import { NextResponse } from "next/server";

export async function GET() {
  console.log("Received GET request at /api/user");
  return NextResponse.json({ message: "Hello from API!" });
}
