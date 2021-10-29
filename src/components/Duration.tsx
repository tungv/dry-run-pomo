import duration from "./getDuration";

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
