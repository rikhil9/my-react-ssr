import AppContainer from "../app-container";
import Link from "next/link";
import SessionsList from "./sessions-list";

export default function SessionPage() {
  return (
    <AppContainer>
      <h2>Session</h2>
      <SessionsList />
      <Link href="/" className="btn btn-primary">
        ← Back to Home
      </Link>
    </AppContainer>
  );
}

