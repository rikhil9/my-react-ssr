import { delay } from "@/lib/delay";
import { Speaker } from "../seminars/code-camp-interfaces";
import SpeakerDetailWithBio from "./speaker-detail-with-bio";

async function getSpeakers() {
    await delay(2000);
  
    const res = await fetch(
      `http://localhost:3000/api/speakersdata`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch speaker data");
    }
    /*   if(speakerId === "8367") {
      throw new Error("Error in get speaker");
    } */
    const data = await res.json();
    return data.data.speakers;
  }

export default async function Speakers() {
  const speakers: Speaker[] = await getSpeakers();

  return (
    <div className="container-main speakers">
      <div className="row">
        {speakers.map((speaker: Speaker) => {
          return (
            <div
              className="col-sm-12 col-lg-6 speakers-list-item"
              key={speaker.id}
            >
              <SpeakerDetailWithBio speaker={speaker} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
