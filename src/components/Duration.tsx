import { CSSProperties } from "react";

export default function Duration(props) {
  const { minutes, seconds, milliseconds } = duration(
    props.futureMs,
    props.startMs ?? Date.now(),
  );
  return (
    <div>
      <span>{minutes}</span>:<span>{seconds}</span>
      <span>.{milliseconds}</span>
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

  const seconds = String(Math.floor((eta / 1000) % 60)).padStart(2, "0");
  const minutes = String(Math.floor((eta / 1000 / 60) % 60));
  const milliseconds = String(eta % 1000).padStart(3, "0");
  return { minutes, seconds, milliseconds };
}
