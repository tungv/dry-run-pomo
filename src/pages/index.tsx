import React, { useEffect, useState } from "react";
import CountDown from "../components/CountDown";
import Duration from "../components/Duration";
import getDuration from "../components/getDuration";
import usePomodoroState from "../hooks/usePomodoroState";

export default function PomodoroHome() {
  const {
    nextStop,
    remaining,
    hasStarted,
    isRunning,
    start,
    pause,
    reset,
    resume,
  } = usePomodoroState();

  return (
    <div>
      {!hasStarted && (
        <div>
          <button onClick={start}>Start</button>
          <Duration futureMs={remaining} startMs={0} />
        </div>
      )}
      {hasStarted && (
        <div>
          <button onClick={reset}>Reset</button>

          {isRunning && (
            <>
              <button onClick={pause}>Pause</button>
              <CountDown to={nextStop} />
            </>
          )}

          {!isRunning && (
            <>
              <button onClick={resume}>resume</button>
              <Duration futureMs={remaining} startMs={0} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
