import path from "node:path";
import { promisify } from "node:util";
import * as fs from "node:fs";
import { YouTubeData } from "@/lib/ts-interfaces";

const readFile = promisify(fs.readFile);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: youTubeId } = await params;

  const fileName = "youtubedata.json";
  const jsonFile = path.resolve("./data", fileName);
  console.log("/api/youtubedata...", youTubeId);

  try {
    const readFileData: Buffer = await readFile(jsonFile);
    const readFileDataString = readFileData
      .toString()
      .replaceAll(/[\n\r]/g, "");

    const {
      data: { youTubeData },
    } = JSON.parse(readFileDataString);

    const sessionVideo = youTubeData?.find(
      (rec: YouTubeData) => rec.id === youTubeId,
    );

    if (sessionVideo) {
      return Response.json(sessionVideo);
    } else {
      return Response.json({ error: "Video not found" }, { status: 404 });
    }
  } catch (e) {
    console.log("/api/youtubedata error:", e);
    return Response.json(
      { error: "Failed to read youtube data" },
      { status: 500 },
    );
  }
}
