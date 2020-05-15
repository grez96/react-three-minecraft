import React, { useRef, useEffect } from "react";
import { useThree } from "react-three-fiber";
import PropTypes from "prop-types";

import { degreesToRadians } from "../utils/math";

function Camera({ location, rotation }) {
  const { setDefaultCamera } = useThree();

  const ref = useRef();

  useEffect(() => setDefaultCamera(ref.current), [setDefaultCamera]);

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
  location: PropTypes.array,
  rotation: PropTypes.array,
};

export default Camera;
