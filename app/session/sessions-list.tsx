import "server-only";

import { SessionData } from "@/lib/ts-interfaces";
import SessionListItem from "@/app/session/session-list-item";
import { SessionListClient } from "./session-list-client";
import { delay } from "@/lib/delay";

async function getSessionsList() {
  await delay(3000);
  const res = await fetch(`http://localhost:3000/api/sessiondata?max=11`);
  if (!res.ok) {
    throw new Error("Failed to fetch session data");
  }
  const data = await res.json();
  return data.data.sessions;
}

export default async function SessionsList() {
  const sessionsData = await getSessionsList();
  return (
    <div className="container">
      <div className="row">
        {sessionsData?.map(function (rec: SessionData) {
          return (
            <SessionListClient key={rec.id} title={rec.title}>
              <SessionListItem rec={rec} />
            </SessionListClient>
          );
        })}
      </div>
    </div>
  );
}
