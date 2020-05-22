import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { updateActiveKeys } from "../data/redux/actions";

function KeyboardControllerCanvas({ activeKeys }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateActiveKeys(activeKeys));
  }, [activeKeys, dispatch]);

  return null;
}

KeyboardControllerCanvas.propTypes = {
  activeKeys: PropTypes.arrayOf(PropTypes.string),
};

KeyboardControllerCanvas.defaultProps = {
  activeKeys: [],
};

export default KeyboardControllerCanvas;
