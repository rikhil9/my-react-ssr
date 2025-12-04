import "server-only";
import AppShowTheme from "./app-show-theme";

export function AppServerComponent() {
  return (
    <div className="container">
      <h1>I am a server component</h1>
      <AppShowTheme />
    </div>
  );
}
