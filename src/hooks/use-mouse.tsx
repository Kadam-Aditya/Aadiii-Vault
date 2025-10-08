import { useEffect, useState } from "react";

type UseMouseType = {
  allowPage?: boolean;
  allowAngle?: boolean;
  allowAcc?: boolean;
};

export const useMouse = ({
  allowPage,
  allowAngle,
  allowAcc,
}: UseMouseType = {}) => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [angle, setAngle] = useState<number>(0);
  const [acceleration, setAcceleration] = useState<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setX(allowPage ? e.pageX : e.clientX);
      setY(allowPage ? e.pageY : e.clientY);

      if (allowAcc) {
        const acc = Math.abs(e.movementX) + Math.abs(e.movementY);
        setAcceleration(acc);
      }
      if (allowAngle) {
        setAngle(Math.atan2(e.movementY, e.movementX));
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [allowPage, allowAcc, allowAngle]);

  return { x, y, angle, acceleration };
};
