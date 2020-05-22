import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export const SUPPORTED_KEYS = {
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
};

function KeyboardControllerDOM({ className, onActiveKeysChange }) {
  const inputRef = useRef();

  const [activeKeys, setActiveKeys] = useState([]);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  useEffect(() => {
    onActiveKeysChange(activeKeys);
  }, [onActiveKeysChange, activeKeys]);

  return (
    <input
      className={className}
      ref={inputRef}
      autoFocus={true}
      onBlur={(e) => {
        setTimeout(() => {
          inputRef.current.focus();
        });
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
  className: PropTypes.string,
  onActiveKeysChange: PropTypes.func,
};

KeyboardControllerDOM.defaultProps = {
  onActiveKeysChange: () => {},
};

export default KeyboardControllerDOM;
