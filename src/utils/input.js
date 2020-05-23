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
