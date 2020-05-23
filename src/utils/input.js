import { useEffect, useRef } from "react";

export const SUPPORTED_KEYS = {
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
};

export function useKeyboard() {
  const activeKeysRef = useRef([]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (
        Object.values(SUPPORTED_KEYS).includes(e.key) &&
        !activeKeysRef.current.includes(e.key)
      ) {
        activeKeysRef.current = [...activeKeysRef.current, e.key];
      }
    };
    const onKeyUp = (e) => {
      if (activeKeysRef.current.includes(e.key)) {
        activeKeysRef.current = activeKeysRef.current.filter(
          (key) => key !== e.key
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keydown", onKeyUp);
    };
  }, [activeKeysRef]);

  return activeKeysRef;
}

export function useMouse() {
  const mouseRef = useRef({ position: { normalizedX: 0, normalizedY: 0 } });

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.position = {
        normalizedX: e.offsetX / window.innerWidth,
        normalizedY: e.offsetY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return mouseRef;
}
