import React, { Suspense, useState, useCallback } from "react";
import { Canvas } from "react-three-fiber";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "./App.css";

import KeyboardControllerDOM from "./components/KeyboardControllerDOM";
import KeyboardControllerCanvas from "./components/KeyboardControllerCanvas";
import Camera from "./components/Camera";
import Cube from "./components/Cube";

import reducer from "./data/redux/reducer";

const store = createStore(reducer);

function App() {
  const [activeKeys, setActiveKeys] = useState([]);

  const onActiveKeysChange = useCallback(
    (activeKeys) => {
      setActiveKeys(activeKeys);
    },
    [setActiveKeys]
  );

  return (
    <div className="App">
      <KeyboardControllerDOM
        className="KeyboardControllerDOM"
        onActiveKeysChange={onActiveKeysChange}
      />

      <Canvas>
        <Provider store={store}>
          <KeyboardControllerCanvas activeKeys={activeKeys} />
          <Camera initialLocation={[0, 2, 5]} rotation={[-25, 0, 0]} />

          <ambientLight />

          <Suspense fallback={null}>
            <Cube />
          </Suspense>
        </Provider>
      </Canvas>
    </div>
  );
}

export default App;
