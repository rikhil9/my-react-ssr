"use client";

import moment from "moment";
import Image from "next/image";

export function AppShowSun({ isoString }: { isoString: string }) {
  function getSunBrightness(isoString: string) {
    const date = moment(isoString);
    const totalMinutes = date.hours() * 60 + date.minutes();
    const noonInMinutes = 12 * 60;
    if (totalMinutes > 7 * 60 && totalMinutes < 18 * 60) {
      const minutesFromNoon = Math.abs(totalMinutes - noonInMinutes);
      const brightnessRatio = 1 - minutesFromNoon / noonInMinutes;
      return 100.0 - brightnessRatio * 100.0;
    }

    return 100.0;
  }

  const sunBrightnessGrayScale = getSunBrightness(isoString);

  const style = {
    filter: `grayscale(${sunBrightnessGrayScale}%)`,
    visibility: sunBrightnessGrayScale === 100.0 ? "hidden" : "visible",
  };

  return (
    <div>
      <Image
        src="/sun.png"
        style={style as React.CSSProperties}
        alt="sun"
        width={100}
        height={100}
      />
    </div>
  );
}
