import 'server-only';
import { delay } from "@/lib/delay";
import SpeakerDetail from "./speaker-detail";
import { Suspense } from 'react';
import SpeakerDetailLoading from './speaker-detail-loading';



export interface Session {
    id?: string;
    title?: string;
    speakerId?: string;
    description?: string;
  }

  async function getSessions() {
    await delay(2000); // 2 seconds
    const res = await fetch(`http://localhost:3000/api/speakersessions`);
    if (!res.ok) {
      throw new Error("Failed to fetch sessions data");
    }
    const data = await res.json();
    return data.data.sessions;
  }

  export default async function SpeakersPage() {
    return (
      <Suspense fallback={<SessionsLoading />}>
        <SpeakersSession />
      </Suspense>
    )

  }

  function SessionsLoading() {
    return (
      <div className="container-main">
        <div className="sessions">
          <div className="news-list">
            {[1, 2, 3].map(() => {
              return (
                <li className="news-tile">
                  <div className="news-tile__top">
                    <h3 className="news-tile__title">Loading...</h3>
                  </div>
                  <div className="news-tile__bottom">
                    <SpeakerDetailLoading />
                  </div>
                </li>
              )
            })}
          </div>
        </div>
      </div>
    )
  }


async function SpeakersSession() {
  const sessions = await getSessions();
    return (
      <div className="container-main">
        <div className="sessions">
          <ul className="news-list">
            {sessions.map((session: Session) => {
              return (
                <li key={session.id} className="news-tile">
                  <div className="news-tile__top">
                    <h3 className="news-tile__title">{session?.title}</h3>
                    {session?.description}
                  </div>
                  <div className="news-tile__bottom">
                  <Suspense fallback={<SpeakerDetailLoading />}>
                    <SpeakerDetail speakerId={session.speakerId ?? "0"} />
                    </Suspense>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
}