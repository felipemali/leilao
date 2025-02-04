import { useEffect, useState } from "react";

type TimeRemainingProps = {
  createdAt?: string;
  duration?: number;
};

export const useTimeRemaining = (props: TimeRemainingProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>();

  const getTimeRemaining = () => {
    const endTime = new Date(
      new Date(props.createdAt).getTime() + props.duration
    ).getTime();

    const distance = endTime - new Date().getTime();

    if (distance < 0) {
      setTimeRemaining("Leilão finalizado");
      return;
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    if (props?.createdAt && props?.duration) {
      setInterval(() => {
        getTimeRemaining();
      }, 1000);
    }
  }, [props]);

  return { timeRemaining };
};
