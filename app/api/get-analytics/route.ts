import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let isanalyticsrequest = request.url.includes("analytics");
    if (!isanalyticsrequest) throw new Error("Invalid request");
    else {
      const analytics = await sql`SELECT * FROM Analytics;`;
      return NextResponse.json({ analytics }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
