"use client";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function ErrorBoundayFunctionalWrapper({
  children,
}: {
  children: ReactNode;
}) {
  function Fallback({ error }: { error: Error }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }

  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
}
