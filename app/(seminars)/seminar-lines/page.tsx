import { delay } from "@/lib/delay";
import Link from "next/link";
import { Session } from "../seminars/code-camp-interfaces";

async function getSessions() {
  await delay(2000);
  const res = await fetch(`http://localhost:3000/api/speakersessions`);
  if (!res.ok) {
    throw new Error("Failed to fetch sessions data");
  }
  const data = await res.json();
  return data.data.sessions;
}

export default async function SessionLines() {
  const sessions = await getSessions();
  return (
    <>
      {sessions.map((session: Session) => {
        return (
          <div
            className="col-12 p-3 border rounded shadow-sm bg-light"
            key={session.id}
          >
            <div className="row">
              <div className="col-9">{session?.title}</div>
              <div className="col-3">
                <Link href={`/speakers/${session.speakerId}`}>Speaker</Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
