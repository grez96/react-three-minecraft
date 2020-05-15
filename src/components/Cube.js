import React, { Fragment } from "react";
import { TextureLoader, NearestFilter } from "three";
import { useLoader } from "react-three-fiber";

import Plane from "./Plane";

import GrassSideImg from "../assets/textures/grass_block_side.png";
import GrassTopImg from "../assets/textures/grass_block_top.png";
import GrassBottomImg from "../assets/textures/grass_block_bottom.png";

function Cube() {
  const grassSideTexture = useLoader(TextureLoader, GrassSideImg);
  grassSideTexture.magFilter = NearestFilter;

  const grassTopTexture = useLoader(TextureLoader, GrassTopImg);
  grassTopTexture.magFilter = NearestFilter;

  const grassBottomTexture = useLoader(TextureLoader, GrassBottomImg);
  grassBottomTexture.magFilter = NearestFilter;

  return (
    <Fragment>
      <Plane
        texture={grassSideTexture}
        location={[0, 0, 0.5]}
        rotation={[0, 0, 0]}
      />
      <Plane
        texture={grassSideTexture}
        location={[0, 0, -0.5]}
        rotation={[0, 180, 0]}
      />
      <Plane
        texture={grassSideTexture}
        location={[0.5, 0, 0]}
        rotation={[0, 90, 0]}
      />
      <Plane
        texture={grassSideTexture}
        location={[-0.5, 0, 0]}
        rotation={[0, -90, 0]}
      />
      <Plane
        texture={grassTopTexture}
        location={[0, 0.5, 0]}
        rotation={[-90, 0, 0]}
      />
      <Plane
        texture={grassBottomTexture}
        location={[0, -0.5, 0]}
        rotation={[90, 0, 0]}
      />
    </Fragment>
  );
}

export default Cube;
