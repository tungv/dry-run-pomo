import { CSSProperties } from "react";

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric

export default function Duration(props) {
  const { minutes, seconds, milliseconds } = duration(
    props.futureMs,
    props.startMs ?? Date.now(),
  );
  return (
    <div>
      <span className="minute">{minutes}</span>:
      <span className="second">{seconds}</span>.
      <span className="millisecond">{milliseconds.substr(0, 3)}</span>
      <style jsx>{`
        span {
          font-variant-numeric: tabular-nums;
        }
        .minute {
          font-size: 1.5rem;
        }

        .second {
          font-size: 1.5rem;
        }

        .millisecond {
          font-size: 0.5rem;
        }
      `}</style>
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
  const minutes = String(Math.floor((eta / 1000 / 60) % 60)).padStart(
    2,
    "\xa0",
  );
  const milliseconds = String(eta % 1000).padStart(3, "0");
  return { minutes, seconds, milliseconds };
}
