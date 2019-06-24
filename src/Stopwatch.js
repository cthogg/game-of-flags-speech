import React from "react";
import { useStopwatch } from "react-timer-hook";

function MyStopwatch() {
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: true
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{minutes}min</span>:<span>{seconds}s</span>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
export default MyStopwatch;
