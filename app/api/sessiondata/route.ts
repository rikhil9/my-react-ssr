import path from "node:path";
import { promisify } from "node:util";
import * as fs from "node:fs";

const readFile = promisify(fs.readFile);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const maxToRetrieve = Number(searchParams.get("max")) || 999;

  const fileName = "sessions.json";
  const jsonFile = path.resolve("./data", fileName);
  console.log("/api/sessiondata...");

  try {
    const readFileData: Buffer = await readFile(jsonFile);
    const readFileDataString = readFileData
      .toString()
      .replaceAll(/[\n\r]/g, "");
    const {
      data: { sessions },
    } = JSON.parse(readFileDataString);

    return Response.json({
      data: {
        sessions: sessions.slice(0, maxToRetrieve),
      },
    });
  } catch (e) {
    console.log("/api/sessiondata error:", e);
    return Response.json(
      { error: "Failed to read sessions data" },
      { status: 500 },
    );
  }
}
