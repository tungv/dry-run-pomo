import { useEffect, useReducer } from "react";
import getDuration from "../components/getDuration";

const FULL_CYCLE = 5 * 60 * 1000;
// const FULL_CYCLE = 25 * 60 * 1000;

interface PomodoroState {
  nextStop: number;
  remaining: number;
  isRunning: boolean;
  hasStarted: boolean;
}
type PomodoroAction =
  | { type: "start" }
  | { type: "pause" }
  | { type: "reset" }
  | { type: "resume" };

const initialState: PomodoroState = {
  nextStop: 0,
  remaining: FULL_CYCLE,
  isRunning: false,
  hasStarted: false,
};

function reducer(state: PomodoroState, action: PomodoroAction): PomodoroState {
  switch (action.type) {
    case "start":
      return {
        ...state,
        isRunning: true,
        hasStarted: true,
        nextStop: Date.now() + FULL_CYCLE,
        remaining: FULL_CYCLE,
      };
    case "pause":
      return {
        ...state,
        isRunning: false,
        remaining: state.nextStop - Date.now(),
      };
    case "reset":
      return initialState;

    case "resume":
      return {
        ...state,
        isRunning: true,
        nextStop: Date.now() + state.remaining,
      };
  }
}

function usePomodoroState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const api = {
    start: () => dispatch({ type: "start" }),
    pause: () => dispatch({ type: "pause" }),
    reset: () => dispatch({ type: "reset" }),
    resume: () => dispatch({ type: "resume" }),
  };

  return [state, api] as const;
}

export default function usePomodoro() {
  const [state, api] = usePomodoroState();

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("interval");
      const { minutes, seconds } = getDuration(state.nextStop, Date.now());

      document.title = `${minutes}:${seconds}`;

      // do nothing when paused
      if (!state.isRunning) {
        return;
      }

      // reset when time is up
      if (state.nextStop <= Date.now()) {
        api.reset();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [state.nextStop, state.isRunning]);

  return {
    ...state,
    ...api,
  };
}
