import React, { useState } from "react";

const Count: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number>();

  const stop = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(undefined);
    }
  };

  const play = () => {
    if (!intervalId) {
      const intervalId = window.setInterval(() => setCount(c => c + 1), 1000);
      setIntervalId(intervalId);
    }
  };

  const reset = () => setCount(0);

  return (
    <div>
      {count}
      <button onClick={play}>Play</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Count;
