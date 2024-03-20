import { sql } from "@vercel/postgres";

interface logInterface {
  feature: "CropRecommendation" | "PlantTimeRecommendation";
  status: "success" | "unsupported" | "error";
}

export async function logEvent(data: logInterface) {
    await setUpTable();
  const query = sql`
        INSERT INTO logs (feature, status)
        VALUES (${data.feature}, ${data.status})
    `;

  await query;
  console.log("Logged event");
}

async function setUpTable() {
  const query = sql`
        CREATE TABLE IF NOT EXISTS logs (
            id SERIAL PRIMARY KEY,
            feature VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL
        )
    `;

  await query;
}
