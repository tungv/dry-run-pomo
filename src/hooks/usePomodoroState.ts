import { useEffect, useReducer } from "react";
import getDuration from "../components/getDuration";
import { FULL_CYCLE } from "../pages/index";

interface PomodoroState {
  stopTime: number;
  pauseTime: number;
}
type PomodoroAction =
  | { type: "start" }
  | { type: "pause" }
  | { type: "reset" }
  | { type: "resume" };
const initialState: PomodoroState = {
  stopTime: 0,
  pauseTime: 0,
};
function reducer(state: PomodoroState, action: PomodoroAction): PomodoroState {
  switch (action.type) {
    case "start":
      return {
        ...state,
        stopTime: Date.now() + FULL_CYCLE,
        pauseTime: 0,
      };
    case "pause":
      return {
        ...state,
        pauseTime: Date.now(),
      };
    case "reset":
      return initialState;

    case "resume":
      return {
        ...state,
        stopTime: state.stopTime + (Date.now() - state.pauseTime),
        pauseTime: 0,
      };
  }
}
export default function usePomodoroState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const api = {
    start: () => dispatch({ type: "start" }),
    pause: () => dispatch({ type: "pause" }),
    reset: () => dispatch({ type: "reset" }),
    resume: () => dispatch({ type: "resume" }),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("interval");
      const { minutes, seconds } = getDuration(state.stopTime, Date.now());

      document.title = `${minutes}:${seconds}`;

      // do nothing when paused
      if (state.pauseTime) {
        return;
      }

      // reset when time is up
      if (state.stopTime < Date.now()) {
        api.reset();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [state.stopTime, state.pauseTime]);

  return {
    ...state,
    ...api,
  };
}
