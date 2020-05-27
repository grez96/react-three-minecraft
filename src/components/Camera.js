import React, { useRef, useEffect, useState, useCallback } from "react";
import { useThree, useFrame } from "react-three-fiber";
import PropTypes from "prop-types";

import { degreesToRadians } from "../utils/math";
import { useKeyboard, useLockedMouse, SUPPORTED_KEYS } from "../utils/input";

const movementSpeed = 1;
const rotationSpeed = 0.05;

function Camera({ initialLocation, initialRotation }) {
  const { setDefaultCamera } = useThree();
  const cameraRef = useRef();
  useEffect(() => setDefaultCamera(cameraRef.current), [setDefaultCamera]);

  const [location, setLocation] = useState(initialLocation);
  const activeKeysRef = useKeyboard();
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
  });

  const [rotation, setRotation] = useState(initialRotation);
  const onMouseChange = useCallback(
    (x, y) => {
      let [pitch, yaw, roll] = rotation;
      pitch += y * -1 * rotationSpeed;
      yaw += x * -1 * rotationSpeed;
      setRotation([pitch, yaw, roll]);
    },
    [rotation, setRotation]
  );
  useLockedMouse(onMouseChange);

  return (
    <perspectiveCamera
      near={0.1}
      far={1000}
      ref={cameraRef}
      position={location}
      rotation={rotation?.map((axisDegrees) => degreesToRadians(axisDegrees))}
    />
  );
}

Camera.propTypes = {
  initialLocation: PropTypes.array,
  rotation: PropTypes.array,
};

export default Camera;
