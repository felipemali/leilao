import { useEffect, useState } from "react";

export const Stopwatch = ({ minutes }) => {
  const [seconds, setSeconds] = useState((minutes * 60) | 0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    let intervalo;
    if (active && seconds > 0) {
      intervalo = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setActive(false);
    }

    return () => clearInterval(intervalo);
  }, [active, seconds]);

  const minutosRestantes = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return (
    <p className="mt-2 font-semibold text-primary">
      Prazo: {minutosRestantes.toString().padStart(2, "0")}:
      {sec.toString().padStart(2, "0")} minutos
    </p>
  );
};
