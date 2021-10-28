import React, { useState } from "react";
import CountDown from "../components/CountDown";
import Duration from "../components/Duration";

const FULL_CYCLE = 25 * 60 * 1000;

export default function PomodoroHome() {
  const [stopTime, setStopTime] = useState(0);
  const [pauseTime, setPausing] = useState(0);
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
