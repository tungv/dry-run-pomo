import { useReducer } from "react";
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

  return {
    ...state,
    start: () => dispatch({ type: "start" }),
    pause: () => dispatch({ type: "pause" }),
    reset: () => dispatch({ type: "reset" }),
    resume: () => dispatch({ type: "resume" }),
  };
}
