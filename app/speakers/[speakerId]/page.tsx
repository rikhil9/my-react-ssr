import { Speaker } from "@/app/(seminars)/seminars/code-camp-interfaces";
import { delay } from "@/lib/delay";
import SpeakerDetailWithBio from "../speaker-detail-with-bio";

async function getSpeaker(id: string) {
  await delay(2000);

  const res = await fetch(`http://localhost:3000/api/speakersdata`);
  if (!res.ok) {
    throw new Error("Failed to fetch speaker data");
  }
  /*     if(id === "8367") {
    throw new Error("Error in get speaker");
  }  */
  const data = await res.json();

  return (
    data.data.speakers.find((speaker: Speaker) => speaker.id === id) || {
      id: "not found",
      first: "not found",
      last: "not found",
      bio: "not found",
      sessionId: "not found",
    }
  );
}

export default async function SpeakerDetailById({
  params,
}: {
  params: Promise<{ speakerId: string }>;
}) {
  const { speakerId } = await params;
  const speaker: Speaker = await getSpeaker(speakerId);

  return (
    <div className="container-main speakers">
      <div className="row">
        <div className="col-12 speakers-list-item p-2">
          <SpeakerDetailWithBio speaker={speaker} />
        </div>
      </div>
    </div>
  );
}
