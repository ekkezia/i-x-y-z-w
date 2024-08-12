'use client'

import React from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

const FrameModel = ({ position, scale }) => {
  const { nodes, materials } = useGLTF("/images/i-x-w-y-z/frame.glb");

  const mat = new THREE.MeshBasicMaterial({
    color: "#404040",
    transparent: true,
    opacity: 0.1,
    wireframe: true,
    wireframeLinewidth: 0.1,
  });

  return (
    <group
      position={position}
      scale={scale}
      rotationZ={Math.PI / 2}
      dispose={null}
    >
      <mesh
        position={[0, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
        geometry={nodes.Frame.geometry}
        material={mat}
      />
    </group>
  );
};

FrameModel.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  scale: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default FrameModel;
