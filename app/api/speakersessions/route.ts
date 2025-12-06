import path from "node:path";
import { promisify } from "node:util";
import * as fs from "node:fs";

const readFile = promisify(fs.readFile);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const maxToRetrieve = Number(searchParams.get("max")) || 999;
  const speakerId = searchParams.get("speakerId");

  const fileName = "speakersessions.json";
  const jsonFile = path.resolve("./data", fileName);
  console.log("/api/speakersessions...");

  try {
    const readFileData: Buffer = await readFile(jsonFile);
    const readFileDataString = readFileData
      .toString()
      .replaceAll(/[\n\r]/g, "");
    const {
      data: { sessions },
    } = JSON.parse(readFileDataString);

    // Filter by speakerId if provided
    let filteredSessions = sessions;
    if (speakerId) {
      filteredSessions = sessions.filter(
        (session: { speakerId: string }) => session.speakerId === speakerId
      );
    }

    return Response.json({
      data: {
        sessions: filteredSessions.slice(0, maxToRetrieve),
      },
    });
  } catch (e) {
    console.log("/api/speakersessions error:", e);
    return Response.json(
      { error: "Failed to read speaker sessions data" },
      { status: 500 },
    );
  }
}

