import React, { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "react-three-fiber";
import PropTypes from "prop-types";

import { degreesToRadians } from "../utils/math";
import { useKeyboard, useMouse, SUPPORTED_KEYS } from "../utils/input";

const movementSpeed = 1;
const rotationSpeed = 40;

function Camera({ initialLocation, initialRotation }) {
  const { setDefaultCamera } = useThree();

  const cameraRef = useRef();
  const activeKeysRef = useKeyboard();
  const mouseRef = useMouse();

  const [location, setLocation] = useState(initialLocation);
  const [rotation, setRotation] = useState(initialRotation);
  const [previousMousePosition, setPreviousMousePosition] = useState({});

  useEffect(() => setDefaultCamera(cameraRef.current), [setDefaultCamera]);

  useFrame((state, delta) => {
    let [x, y, z] = location;
    activeKeysRef.current.forEach((key) => {
      switch (key) {
        case SUPPORTED_KEYS.left:
          x -= movementSpeed * delta;
          break;
        case SUPPORTED_KEYS.up:
          z -= movementSpeed * delta;
          break;
        case SUPPORTED_KEYS.right:
          x += movementSpeed * delta;
          break;
        case SUPPORTED_KEYS.down:
          z += movementSpeed * delta;
          break;
        default:
      }
      setLocation([x, y, z]);
    });

    let [pitch, roll, yaw] = rotation;
    const MOVEMENT_THRESHOLD = 0.01;
    const mouseYDifference =
      (previousMousePosition.y === undefined ? 0 : previousMousePosition.y) -
      mouseRef.current.position.normalizedY;
    if (
      previousMousePosition.y === undefined ||
      Math.abs(mouseYDifference) > MOVEMENT_THRESHOLD
    ) {
      pitch += mouseYDifference * rotationSpeed;
      setPreviousMousePosition({
        y: mouseRef.current.position.normalizedY,
      });
      setRotation([pitch, roll, yaw]);
    }
  });

  return (
    <perspectiveCamera
      near={0.1}
      far={1000}
      ref={cameraRef}
      position={location}
      rotation={rotation.map((axisDegrees) => degreesToRadians(axisDegrees))}
    />
  );
}

Camera.propTypes = {
  initialLocation: PropTypes.array,
  rotation: PropTypes.array,
};

export default Camera;
