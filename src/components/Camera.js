import React, { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "react-three-fiber";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { degreesToRadians } from "../utils/math";
import { SUPPORTED_KEYS } from "./KeyboardControllerDOM";

const movementSpeed = 1;

function Camera({ initialLocation, rotation }) {
  const activeKeys = useSelector((state) => state.activeKeys);

  const { setDefaultCamera } = useThree();

  const ref = useRef();

  const [location, setLocation] = useState(initialLocation);

  useEffect(() => setDefaultCamera(ref.current), [setDefaultCamera]);
  useFrame((state, delta) => {
    let [x, y, z] = location;

    activeKeys.forEach((key) => {
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

  return (
    <perspectiveCamera
      near={0.1}
      far={1000}
      ref={ref}
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
