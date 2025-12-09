"use client";

export default function ErrorBoundayFunctionalWrapper({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div role="alert">
      <p>Error Loading details for speaker</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={reset}>Try again</button>
    </div>
  );
}