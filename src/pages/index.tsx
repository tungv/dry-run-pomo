import { useEffect, useReducer, useState } from "react";

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

function CountDown(props) {
  const [_, refresh] = useReducer((i) => i + 1, 0);

  useEffect(() => {
    let unmounted = false;
    requestAnimationFrame(() => {
      if (unmounted) return;
      refresh();
    });

    return () => {
      unmounted = true;
    };
  });

  return <Duration futureMs={props.to} />;
}

function Duration(props) {
  const { minutes, seconds, milliseconds } = duration(
    props.futureMs,
    props.startMs ?? Date.now(),
  );
  return (
    <div>
      {minutes}:{seconds}.{milliseconds}
    </div>
  );
}

function duration(
  future: number,
  start: number,
): {
  minutes: string;
  seconds: string;
  milliseconds: string;
} {
  const eta = future - start;

  const milliseconds = String(eta % 1000).padStart(3, "0");
  const seconds = String(Math.floor((eta / 1000) % 60)).padStart(2, "0");
  const minutes = String(Math.floor((eta / 1000 / 60) % 60));
  return { minutes, seconds, milliseconds };
}
