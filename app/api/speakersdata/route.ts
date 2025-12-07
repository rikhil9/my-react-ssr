import path from "node:path";
import { promisify } from "node:util";
import * as fs from "node:fs";

const readFile = promisify(fs.readFile);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const maxToRetrieve = Number(searchParams.get("max")) || 999;
  const id = searchParams.get("id");

  const fileName = "speakers.json";
  const jsonFile = path.resolve("./data", fileName);
  console.log("/api/speakersdata...");

  try {
    const readFileData: Buffer = await readFile(jsonFile);
    const readFileDataString = readFileData
      .toString()
      .replaceAll(/[\n\r]/g, "");
    const {
      data: { speakers },
    } = JSON.parse(readFileDataString);

    // If id is provided, return single speaker
    if (id) {
      const speaker = speakers.find((s: { id: string }) => s.id === id);
      if (speaker) {
        return Response.json({ data: { speaker } });
      } else {
        return Response.json({ error: "Speaker not found" }, { status: 404 });
      }
    }

    return Response.json({
      data: {
        speakers: speakers.slice(0, maxToRetrieve),
      },
    });
  } catch (e) {
    console.log("/api/speakersdata error:", e);
    return Response.json(
      { error: "Failed to read speakers data" },
      { status: 500 },
    );
  }
}
