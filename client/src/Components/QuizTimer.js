import React, { useState, useEffect } from 'react';

const QuizTimer = ({ duration, onTimerExpired }) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    let timerInterval = null;

    if (remainingTime > 0) {
      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      // Timer expired
      clearInterval(timerInterval);
      onTimerExpired({isTimerExpired:true});
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [remainingTime, onTimerExpired]);

  // Format remaining time as minutes and seconds
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <>
      <p>Time Remaining: <span className={seconds<=59 && minutes==0 ?'text-danger':''}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span></p>
    </>
  );
};

export default QuizTimer;
