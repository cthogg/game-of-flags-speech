import React from "react";
import { useStopwatch } from "react-timer-hook";

function MyStopwatch() {
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: true
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div className={'is-size-3'}>
        <span>{minutes}min</span>:<span>{seconds}s</span>
      </div>
    </div>
  );
}
export default MyStopwatch;
