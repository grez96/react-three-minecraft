import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "react-three-fiber";

function Camera({ position }) {
  const ref = useRef();

  const { setDefaultCamera } = useThree();

  useEffect(() => setDefaultCamera(ref.current), [setDefaultCamera]);

  useFrame(() => ref.current.updateMatrixWorld());

  return (
    <perspectiveCamera near={0.1} far={1000} ref={ref} position={position} />
  );
}

export default Camera;
