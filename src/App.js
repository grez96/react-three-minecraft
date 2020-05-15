import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";

import "./App.css";

import Camera from "./components/Camera";
import Cube from "./components/Cube";

function App() {
  return (
    <div className="App">
      <Canvas>
        <Camera location={[-3, 2, 5]} rotation={[-25, -25, 0]} />

        <ambientLight />

        <Suspense fallback={null}>
          <Cube />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
