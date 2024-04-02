import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const feature = searchParams.get("feature");
    const requestStatus = searchParams.get("requestStatus");
    const errorReason = searchParams.get("errorReason");

    try {
        if (!feature || !requestStatus) throw new Error("Feature and request status required");
        await sql`INSERT INTO Analytics (feature, request_status, error_reason) VALUES (${feature}, ${requestStatus}, ${errorReason});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: "Data inserted successfully" }, { status: 200 });
}