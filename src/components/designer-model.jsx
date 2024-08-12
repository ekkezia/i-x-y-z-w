"use client";

import React, { useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { supabaseUrl } from "@/supabase/supabase";

const DesignerModel = ({ position, scale, rotation, path, showAnimation }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(
    `${supabaseUrl}/${path}`
  );

  let mixer;

  if (animations.length && showAnimation) {
    mixer = new THREE.AnimationMixer(scene);
    mixer.timeScale = 0.5;
    animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
      action.loop = THREE.LoopPingPong;
    });
  }
  const { clock } = useThree();
  const delta = clock.getDelta();

  useFrame(() => {
    if (showAnimation) {
      mixer?.update(delta);
      ref.current.rotation.y -= 0.001;
    }
  });

  return (
    <group ref={ref}>
      <primitive
        dispose={null}
        object={scene}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    </group>
  );
};

DesignerModel.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  scale: PropTypes.arrayOf(PropTypes.number).isRequired,
  rotation: PropTypes.arrayOf(PropTypes.number).isRequired,
  path: PropTypes.string.isRequired,
};

export default DesignerModel;
