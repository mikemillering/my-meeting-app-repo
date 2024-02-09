import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  duration: number; // duration in seconds
  meetingDisplay: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, meetingDisplay }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;

      setProgress((elapsedTime / (duration * 1000)) * 100);

      if (elapsedTime < duration * 1000) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      startTime = null; // reset start time when component unmounts
    };
  }, [meetingDisplay, duration]);

  return (
    <div className="progress-bar-container rounded">
      <div className="progress-bar rounded" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;

