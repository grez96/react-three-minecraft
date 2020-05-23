import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "./App.css";

import Camera from "./components/Camera";
import Cube from "./components/Cube";

import reducer from "./data/redux/reducer";

const store = createStore(reducer);

function App() {
  return (
    <div className="App">
      <Canvas>
        <Provider store={store}>
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
