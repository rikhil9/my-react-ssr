"use client";
import { useState, useEffect } from "react";
import moment from "moment";
import { AppShowSun } from "./app-show-sun";
import { useCounter } from "rooks";

export function AppHeaderClock({ isoString }: { isoString: string }) {
  const [currentTime, setCurrentTime] = useState(moment(isoString));
  const {value, incrementBy} = useCounter(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((oldDate) => moment(oldDate.add(1, "seconds")));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <p>Current Time: {currentTime.format("HH:mm:ss")}</p>
      <AppShowSun isoString={currentTime.toISOString()} />
      <button className="btn btn-secondary" onClick={() => incrementBy(5)}>  increment {value}</button>
    </>
  );
}
