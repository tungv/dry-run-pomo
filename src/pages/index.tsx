import React, { useEffect, useState } from "react";
import CountDown from "../components/CountDown";
import Duration from "../components/Duration";
import getDuration from "../components/getDuration";

// const FULL_CYCLE = 25 * 60 * 1000;
const FULL_CYCLE = 0.05 * 60 * 1000;

export default function PomodoroHome() {
  const [stopTime, setStopTime] = useState(0);
  const [pauseTime, setPausing] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("interval");
      const { minutes, seconds } = getDuration(stopTime, Date.now());

      document.title = `${minutes}:${seconds}`;

      if (pauseTime) {
        return;
      }
      if (stopTime < Date.now()) {
        setStopTime(0);
      }

      if (stopTime === 0) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [stopTime, pauseTime]);

  return (
    <div>
      <button
        onClick={() => {
          setStopTime(Date.now() + FULL_CYCLE);
          setPausing(0);
        }}
      >
        Start
      </button>
      {pauseTime === 0 && (
        <button onClick={() => setPausing(Date.now())}>pause</button>
      )}
      {pauseTime !== 0 && (
        <button
          onClick={() => {
            const timeLeft = stopTime - pauseTime;
            setPausing(0);
            setStopTime(Date.now() + timeLeft);
          }}
        >
          resume
        </button>
      )}

      {stopTime === 0 ? (
        <Duration futureMs={FULL_CYCLE} startMs={0} />
      ) : pauseTime ? (
        <Duration futureMs={stopTime} startMs={pauseTime} />
      ) : (
        <CountDown to={stopTime} />
      )}

      <pre>{JSON.stringify({ stopTime, pauseTime }, null, 2)}</pre>
    </div>
  );
}
