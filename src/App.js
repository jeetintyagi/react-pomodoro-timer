import React, { useState, useRef } from "react";
import "./App.css";

function padTime(time) {
  return time.toString().padStart(2, "0");
}

let interval = setInterval(() => {}, 1000);
clearInterval(interval);

const App = () => {
  const [title, setTitle] = useState("POMODORO TIMER");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timeDecrement, setTimeDecrement] = useState(false);

  let intervalRef = useRef(null);

  function startTimer() {
    if (intervalRef.current != null) return;
    setIsRunning(true);
    setTimeDecrement(true);
    setTitle("Punctuality is the thief of time.");
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;

        resetTimer();
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current == null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    if (timeLeft < 25 * 60) setTimeDecrement(true);
    setIsRunning(false);
    setTitle("Time and tide wait for none.");
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setTimeDecrement(false);
    setIsRunning(false);
    setTitle("If you are full of life you will never choose comfort");
    setTimeLeft(25 * 60);
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {timeDecrement && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
};

export default App;
