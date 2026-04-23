import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Point d'extension prêt pour exporter PDF/Word/Excel.",
    formats: ["pdf", "docx", "xlsx"]
  });
}
