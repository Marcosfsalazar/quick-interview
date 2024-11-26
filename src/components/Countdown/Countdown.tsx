import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialTime: number;
  onComplete: () => void;
}

const Countdown = ({ initialTime, onComplete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="countdown-timer">
      {`${minutes}:${seconds.toString().padStart(2, '0')}`}
    </div>
  );
};

export default Countdown;
