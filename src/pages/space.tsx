/* eslint-disable react/no-unknown-property */
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export const Space = () => {
  return (
    <div className="relative h-screen w-screen bg-black">
      <div className="absolute top-10 left-10 z-10 font-serif text-4xl text-white">
        CareerScope.
      </div>
      <Canvas camera={{ fov: 60, position: [5, 5, 10] }}>
        {/* Ambient + Point Light */}
        <ambientLight intensity={0.05} />
        <pointLight color="white" intensity={3} position={[0, 0, 0]} />

        {/* 태양 */}
        <Planet color="#fff437" position={[0, 0, 0]} radius={0.1} />

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

const Planet = ({
  color,
  position,
  radius,
}: {
  color: string;
  position: [number, number, number];
  radius: number;
}) => {
  return (
    <Sphere args={[radius, 64, 64]} position={position}>
      <meshStandardMaterial emissive={color} />
    </Sphere>
  );
};
