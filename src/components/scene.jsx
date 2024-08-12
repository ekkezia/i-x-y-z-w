'use client'

import * as THREE from "three";
import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  useVideoTexture,
  OrbitControls,
  Html,
  useProgress,
  SpotLight,
  PerspectiveCamera,
} from "@react-three/drei";
import DesignerModel from "./designer-model";
import MODELS_OBJECT from "../config/models";
import useTimer from "./timer";
import useBreakpoints from "@/hooks/useBreakpoints";
import { supabaseUrl } from "@/supabase/supabase";

const Scene = ({ modelKey }) => {
  const { isSmallScreen } = useBreakpoints();

  const showBox = !isSmallScreen;

  return (
    // <Suspense fallback={<Loader />}>
    <Canvas dpr={[1, 1.5]}>
      <color attach="background" args={[0x404040]} />
      <fog attach="fog" args={[0x404040, 0, 15]} />
      <PerspectiveCamera
        position={[0, isSmallScreen ? -0.8 : -1, isSmallScreen ? 2.5 : 2.9]}
        rotation={[-Math.PI / 2000, 0, 0]}
      >
        <group position={[0, 0, 0]}>
          {
            showBox && <Frame
              name={MODELS_OBJECT[modelKey].name}
              model={MODELS_OBJECT[modelKey].model}
              video={MODELS_OBJECT[modelKey].video}
              date={MODELS_OBJECT[modelKey].date}
            />
          }
          {/* {
            !xs && router.pathname.split('/')[2] !== '' &&
            <Frame
              name={MODELS_OBJECT[modelKey].name}
              model={MODELS_OBJECT[modelKey].model}
              video={MODELS_OBJECT[modelKey].video}
              date={MODELS_OBJECT[modelKey].date}
            />

          } */}
          <Suspense fallback={<Loader />}>
            <DesignerModel
              position={[0, 1.1, 0]}
              scale={[1.1, 1.1, 1.1]}
              rotation={[0, Math.PI / 8, 0]}
              path={MODELS_OBJECT[modelKey].model}
              showAnimation={showBox}
            />
          </Suspense>
          {/* <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={50}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color={0x404040}
            metalness={0.5}
          />
        </mesh> */}
        </group>
        <Environment map="/images/i-x-w-y-z/hdr.hdr" />
        <ambientLight intensity={0.5} />
        {/* Left Spot */}
        <SpotLight
          position={[-4, -2, -4]}
          // rotation={[-Math.PI/2, 0, 0]}
          color="#ffffff"
          distance={100}
          angle={5}
          attenuation={5}
          anglePower={5} // Diffuse-cone anglePower (default: 5)
          power={4}
          penumbra={1}
          castShadow
        />
        {/* Right Spot */}
        <SpotLight
          position={[4, -2, -4]}
          // rotation={[-Math.PI/2, 0, 0]}
          color="#ffffff"
          distance={100}
          angle={5}
          attenuation={5}
          anglePower={5} // Diffuse-cone anglePower (default: 5)
          power={4}
          penumbra={1}
          castShadow
        />
        {/* Front Spot */}
        <SpotLight
          position={[0, 3, 4]}
          // rotation={[-Math.PI/2, 0, 0]}
          color={0xffffff}
          distance={10}
          angle={0.1}
          attenuation={5}
          anglePower={5} // Diffuse-cone anglePower (default: 5)
          power={20}
          penumbra={1}
          castShadow
        />
        <OrbitControls />
      </PerspectiveCamera>
    </Canvas>
    // </Suspense>
  );
};

export default Scene;

const DISPLAY_CASE_SIZE = [1, 2, 1];

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <>
      <Html
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "#00ff00",
          transform: "translateX(-50%)",
        }}
      >
        {progress}%
      </Html>
    </>
  );
}

const STATIC_PATH = "https://lmgbcuolwhkqoowxnaik.supabase.co/storage/v1/object/public/i-x-y-z-w";

function Frame({
  name,
  video,
  date,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const frame = useRef();
  const frameRotationRef = useRef();
  const groupRef = useRef();
  const { progress } = useTimer(date);

  useEffect(() => {
    p.set(0, 1.5, 10); // original location
    q.identity();
  });

  // Rotation
  useFrame((state, dt) => {
    frameRotationRef.current.rotation.y += 0.005;
  });

  const videoUrl = `${supabaseUrl}/${video}`;
  const videoTexture = useVideoTexture(videoUrl);

  const MIN_PROGRESS = 20;
  const MAX_PROGRESS = 90;
  const mappedProgress =
    MIN_PROGRESS + (progress * (MAX_PROGRESS - MIN_PROGRESS)) / 100;

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0]} ref={frameRotationRef}>
        <mesh name={name} scale={[1, 1, 1]} position={[0, 1, 0]}>
          {/* Display Case */}
          <mesh
            ref={frame}
            raycast={() => null}
            scale={[1, 1, 1]}
            position={[0, 0, 0]}
          >
            <boxGeometry attach="geometry" args={DISPLAY_CASE_SIZE} />
            <meshBasicMaterial
              attach="material"
              map={videoTexture}
              opacity={(100 - mappedProgress) / 100}
              transparent
              toneMapped={false}
            />
          </mesh>
        </mesh>
      </group>
    </group>
  );
}
