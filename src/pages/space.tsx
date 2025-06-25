/* eslint-disable react/no-unknown-property */
import {
  Billboard,
  Line,
  OrbitControls,
  Sphere,
  Stars,
  Text,
  useCursor,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Select,
  Selection,
  SelectiveBloom,
} from "@react-three/postprocessing";
import { useState } from "react";

import { getRandomColor, getRandomVector } from "~/lib/utils";

const data: {
  color: string;
  id: number;
  name: string;
  userScore: number;
  vector: [number, number, number];
}[] = [
  {
    color: getRandomColor(100),
    id: 1,
    name: "삼성전자",
    userScore: 85,
    vector: getRandomVector(1),
  },
  {
    color: getRandomColor(100),
    id: 2,
    name: "LG전자",
    userScore: 90,
    vector: getRandomVector(1),
  },
  {
    color: getRandomColor(100),
    id: 3,
    name: "네이버",
    userScore: 78,
    vector: getRandomVector(1),
  },
  {
    color: getRandomColor(100),
    id: 4,
    name: "카카오",
    userScore: 88,
    vector: getRandomVector(1),
  },
  {
    color: getRandomColor(100),
    id: 5,
    name: "현대자동차",
    userScore: 92,
    vector: getRandomVector(1),
  },
  {
    color: getRandomColor(100),
    id: 6,
    name: "기아",
    userScore: 80,
    vector: getRandomVector(1),
  },
  {
    color: getRandomColor(100),
    id: 7,
    name: "SK텔레콤",
    userScore: 75,
    vector: getRandomVector(1),
  },
  {
    color: getRandomColor(100),
    id: 8,
    name: "LG디스플레이",
    userScore: 82,
    vector: getRandomVector(1),
  },
];

const renderData = data.map((item) => ({
  color: item.color,
  id: item.id,
  name: item.name,

  position: item.vector.map((v) => ((v * item.userScore) / 100) * 4) as [
    number,
    number,
    number,
  ],
}));

export const Space = () => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  const hovering = typeof hoveredIndex === "number";
  const hoveredPlanetPos =
    hoveredIndex !== null ? renderData[hoveredIndex].position : [0, 0, 0];
  useCursor(hovering, "pointer");

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
        <Selection>
          <EffectComposer autoClear={false}>
            <SelectiveBloom
              intensity={2}
              luminanceSmoothing={0.9}
              luminanceThreshold={0.1}
            />
          </EffectComposer>
          <Select enabled>
            <Planet
              color="#fff437"
              opacity={1}
              position={[0, 0, 0]}
              radius={0.1}
            />
          </Select>
        </Selection>
        {/* 별 배경 */}
        <Stars
          count={3000}
          depth={50}
          factor={4}
          fade
          radius={100}
          saturation={0}
        />
        {renderData.map((item, index) => (
          <>
            <Planet
              color={item.color}
              key={item.id}
              onHover={() => setHoveredIndex(index)}
              onUnhover={() => setHoveredIndex(null)}
              opacity={hovering ? (hoveredIndex === index ? 1 : 0.1) : 1}
              position={item.position}
              radius={0.05}
            />
            {(hovering ? hoveredIndex == index : true) && (
              <PlanetMarker
                key={`marker-${item.id}`}
                name={item.name}
                position={item.position}
              />
            )}
          </>
        ))}
        {hovering && (
          <Line
            color="white"
            dashed
            dashSize={0.1}
            gapSize={0.05}
            lineWidth={1}
            points={[
              [0, 0, 0], // 태양
              hoveredPlanetPos as [number, number, number], // 행성 위치
            ]}
          />
        )}
        <OrbitControls
          autoRotate={!hovering}
          autoRotateSpeed={0.5}
          enablePan
          enableRotate
          enableZoom
        />
      </Canvas>
    </div>
  );
};

const Planet = ({
  color,
  onHover,
  onUnhover,
  opacity,
  position,
  radius,
}: {
  color: string;
  onHover?: () => void;
  onUnhover?: () => void;
  opacity: number;
  position: [number, number, number];
  radius: number;
}) => {
  return (
    <group>
      {/* 보이는 행성 */}
      <Sphere args={[radius, 64, 64]} position={position}>
        <meshStandardMaterial emissive={color} opacity={opacity} transparent />
      </Sphere>

      {/* 감지 전용 hitbox */}
      <mesh
        onPointerOut={onUnhover}
        onPointerOver={onHover}
        position={position}
      >
        <sphereGeometry args={[radius * 5, 16, 16]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>
    </group>
  );
};

const PlanetMarker = ({
  name = "VENUS",
  position = [0, 0, 0],
}: {
  name: string;
  position: [number, number, number];
}) => {
  return (
    <Billboard position={position}>
      {/* 텍스트 표시 */}
      <Text
        anchorX="center"
        anchorY="middle"
        fontSize={0.2}
        outlineColor="#000"
        outlineWidth={0.005}
        position={[0, -0.3, 0]} // 아래에 표시
      >
        {name}
      </Text>
    </Billboard>
  );
};
