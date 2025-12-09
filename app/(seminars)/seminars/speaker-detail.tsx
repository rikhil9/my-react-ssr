import "server-only";
import Image from "next/image";
import { delay } from "@/lib/delay";
import ToolTipSpeaker from "./tooltip-speaker";
import { Speaker } from "./code-camp-interfaces";
import Link from "next/link";

async function getSpeaker(speakerId: string) {
  await delay(2000);

  const res = await fetch(
    `http://localhost:3000/api/speakersdata?id=${speakerId}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch speaker data");
  }
  /*   if(speakerId === "8367") {
    throw new Error("Error in get speaker");
  } */
  const data = await res.json();
  return data.data.speaker;
}

export default async function SpeakerDetail({
  speakerId,
}: {
  speakerId: string;
}) {
  const speaker: Speaker = await getSpeaker(speakerId);
  return (
    <ToolTipSpeaker speaker={speaker} key={speakerId}>
      <div className="col-12-col-sm-6 speakers-list-item" key={speakerId}>
        <div className="events-speaker d-flex align-items-center">
          <div className="events-speaker-photo">
            <Image
              src={`/speakers/speaker-${speaker?.id}.jpg`}
              alt={`${speaker.first} ${speaker.last}`}
              width={135}
              height={135}
            />
          </div>
          <div className="events-speaker-description">
            <Link href={`/speakers/${speaker.id}`}>
              <div className="name">
                {speaker.first} {speaker.last}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </ToolTipSpeaker>
  );
}
