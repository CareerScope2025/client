/* eslint-disable react/no-unknown-property */
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export const Space = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <Canvas camera={{ fov: 60, position: [5, 5, 10] }}>
        {/* Ambient + Point Light */}
        <ambientLight intensity={0.05} />
        <pointLight color="white" intensity={3} position={[0, 0, 0]} />

        {/* 태양 */}
        <Sun />

        {/* 별 배경 */}
        <Stars
          count={3000}
          depth={50}
          factor={4}
          fade
          radius={100}
          saturation={0}
        />

        <OrbitControls enablePan enableRotate enableZoom />

        {/* 빛 퍼짐 효과 */}
        <EffectComposer>
          <Bloom
            intensity={2}
            luminanceSmoothing={0.9}
            luminanceThreshold={0.1}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

const Sun = () => {
  return (
    <Sphere args={[0.1, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial emissive="#fff437" />
    </Sphere>
  );
};
