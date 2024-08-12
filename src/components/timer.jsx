'use client'

import { useEffect, useState } from "react";

function useTimer(date) {
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    timerIsEnded: false,
  });

  useEffect(() => {
    const timerEndDate = new Date(date).getTime();
    const timerStartDate = new Date("Jul 02, 2023 10:57:00").getTime();

    if (!time.timerIsEnded) {
      setInterval(() => {
        let now = new Date().getTime();
        let timeleft = timerEndDate - now;
        if (timeleft > 0) {
          setTime({
            days: Math.floor(timeleft / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutes: Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeleft % (1000 * 60)) / 1000),
            timerIsEnded: false,
          });
          setProgress(
            (Math.abs(now - timerStartDate) /
              Math.abs(timerEndDate - timerStartDate)) *
              100
          );
        } else {
          setTime({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            timerIsEnded: true,
          });
          setProgress(100);
        }
      }, 1000);
    }
  }, []);

  return { progress, time };
}

export default useTimer;
