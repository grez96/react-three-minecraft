import React, { useRef, useEffect } from "react";
import { useThree } from "react-three-fiber";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { degreesToRadians } from "../utils/math";
import { updateMessage } from "../data/redux/actions";

function Camera({ location, rotation }) {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);

  const { setDefaultCamera } = useThree();

  const ref = useRef();

  useEffect(() => setDefaultCamera(ref.current), [setDefaultCamera]);
  useEffect(() => {
    dispatch(updateMessage("Bye Redux!"));
  }, [dispatch]);
  useEffect(() => {
    console.log(message);
  }, [message]);

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
