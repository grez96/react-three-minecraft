import React from "react";
import { Canvas } from "react-three-fiber";

import "./App.css";

import Camera from "./components/Camera";

function App() {
  return (
    <div className="App">
      <Canvas>
        <Camera position={[0, 0, 5]} />

        <ambientLight />

        <mesh position={[0, 0, 0]}>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={"blue"} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
