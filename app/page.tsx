import "server-only";
import { AppHeaderClock } from "./app-header-clock";
import { AppServerComponent } from "./app-server-component";
import AppContainer from "./app-container";
import ServerForm from "./server-form";

export default function AppHeader() {
  const currentTime = new Date().toISOString();
  return (
    <AppContainer>
      <h2>Clock App</h2>
      <hr />
      <AppHeaderClock isoString={currentTime}></AppHeaderClock>
      <ServerForm />
      <AppServerComponent />
    </AppContainer>
  );
}
