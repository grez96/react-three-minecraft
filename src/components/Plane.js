import React from "react";
import PropTypes from "prop-types";

import { degreesToRadians } from "../utils/math";

const SCALE = [1, 1, 1];

function Plane({ location, rotation, texture }) {
  return (
    <mesh
      position={location}
      rotation={rotation.map((axisDegrees) => degreesToRadians(axisDegrees))}
    >
      <planeBufferGeometry attach="geometry" args={SCALE} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
}

Plane.propTypes = {
  location: PropTypes.array,
  rotation: PropTypes.array,
  texture: PropTypes.object,
};

export default Plane;
