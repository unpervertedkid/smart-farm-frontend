import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const analytics = await sql`SELECT * FROM Analytics;`;
        return NextResponse.json({ analytics }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}