import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const SUPPORTED_KEYS = {
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
};

function KeyboardControllerDOM({ onActiveKeysChange }) {
  const [activeKeys, setActiveKeys] = useState([]);

  useEffect(() => {
    onActiveKeysChange(activeKeys);
  }, [onActiveKeysChange, activeKeys]);

  return (
    <input
      autoFocus
      onBlur={(e) => {
        e.currentTarget.focus();
      }}
      onChange={(e) => {
        e.target.value = "";
      }}
      onKeyDown={(e) => {
        if (
          Object.values(SUPPORTED_KEYS).includes(e.key) &&
          !activeKeys.includes(e.key)
        ) {
          setActiveKeys([...activeKeys, e.key]);
        }
      }}
      onKeyUp={(e) => {
        if (activeKeys.includes(e.key)) {
          setActiveKeys(activeKeys.filter((key) => key !== e.key));
        }
      }}
    />
  );
}

KeyboardControllerDOM.propTypes = {
  onActiveKeysChange: PropTypes.func,
};

KeyboardControllerDOM.defaultProps = {
  onActiveKeysChange: () => {},
};

export default KeyboardControllerDOM;
