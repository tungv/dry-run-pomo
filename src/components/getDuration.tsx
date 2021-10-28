export default function getDuration(
  future: number,
  start: number,
): {
  minutes: string;
  seconds: string;
  milliseconds: string;
} {
  const eta = future - start;

  if (eta < 0) {
    return {
      minutes: "\xa00",
      seconds: "00",
      milliseconds: "000",
    };
  }

  const seconds = String(Math.floor((eta / 1000) % 60)).padStart(2, "0");
  const minutes = String(Math.floor((eta / 1000 / 60) % 60)).padStart(
    2,
    "\xa0",
  );
  const milliseconds = String(eta % 1000).padStart(3, "0");
  return { minutes, seconds, milliseconds };
}
