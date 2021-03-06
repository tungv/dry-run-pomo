import { useEffect, useReducer } from "react";
import Duration from "./Duration";

export default function CountDown(props) {
  useAnimationFrame();

  return <Duration futureMs={props.to} />;
}

function useAnimationFrame() {
  const [_, refresh] = useReducer((i) => i + 1, 0);

  useEffect(() => {
    let unmounted = false;

    function requestRefresh() {
      if (!unmounted) {
        refresh();
        requestAnimationFrame(() => requestRefresh());
      }
    }

    requestRefresh();

    return () => {
      unmounted = true;
    };
  }, []);
}
