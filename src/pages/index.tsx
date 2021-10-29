import React, { useEffect, useState } from "react";
import CountDown from "../components/CountDown";
import Duration from "../components/Duration";
import getDuration from "../components/getDuration";
import usePomodoroState from "../hooks/usePomodoroState";

// const FULL_CYCLE = 25 * 60 * 1000;
export const FULL_CYCLE = 0.05 * 60 * 1000;

export default function PomodoroHome() {
  const { stopTime, pauseTime, start, pause, reset, resume } =
    usePomodoroState();

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("interval");
      const { minutes, seconds } = getDuration(stopTime, Date.now());

      document.title = `${minutes}:${seconds}`;

      // do nothing when paused
      if (pauseTime) {
        return;
      }

      // reset when time is up
      if (stopTime < Date.now()) {
        reset();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [stopTime, pauseTime]);

  return (
    <div>
      <button onClick={start}>Start</button>
      {pauseTime === 0 && <button onClick={pause}>pause</button>}
      {pauseTime !== 0 && <button onClick={resume}>resume</button>}

      {stopTime === 0 ? (
        <Duration futureMs={FULL_CYCLE} startMs={0} />
      ) : pauseTime ? (
        <Duration futureMs={stopTime} startMs={pauseTime} />
      ) : (
        <CountDown to={stopTime} />
      )}
    </div>
  );
}
