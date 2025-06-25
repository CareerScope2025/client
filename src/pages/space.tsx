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
import { XIcon } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";

import { AButton } from "~/components/a-button";
import { ChartRadar } from "~/components/chart";
import { Label } from "~/components/ui/label";
import { MultiSelect } from "~/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { SideModal } from "~/components/ui/side-modal";
import { Slider } from "~/components/ui/slider";
import { Textarea } from "~/components/ui/textarea";
import { getRandomColor, getRandomVector, midpoint } from "~/lib/utils";

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
  {
    color: getRandomColor(100),
    id: 9,
    name: "한화",
    userScore: 77,
    vector: getRandomVector(1),
  },
  {
    color: getRandomColor(100),
    id: 10,
    name: "포스코",
    userScore: 84,
    vector: getRandomVector(1),
  },
  {
    color: getRandomColor(100),
    id: 11,
    name: "현대중공업",
    userScore: 89,
    vector: getRandomVector(1),
  },
  {
    color: getRandomColor(100),
    id: 12,
    name: "두산",
    userScore: 81,
    vector: getRandomVector(1),
  },
  {
    color: getRandomColor(100),
    id: 13,
    name: "롯데",
    userScore: 76,
    vector: getRandomVector(1),
  },
  {
    color: getRandomColor(100),
    id: 14,
    name: "CJ",
    userScore: 83,
    vector: getRandomVector(1),
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const renderData = data.map((item) => ({
  color: item.color,
  id: item.id,
  name: item.name,
  position: item.vector.map((v) => ((v * item.userScore) / 100) * 4) as [
    number,
    number,
    number,
  ],

  userScore: item.userScore,
}));

const overview = {
  address: "회사 주소",
  avgSalary: 10000,
  entrySalary: 6000,
  id: 1,
  name: "삼성",
  salary: 5750.0,
  scale: 1.0,
  traits: 0.7,
  vision:
    "**주인의식**: 책임 있는 사람은 혼자서가 아닌 소통을 통해 일합니다. 온전히 나의 것으로 생각하고 실행하며, 아이디어는 실행할 때 비로소 가치가 생깁니다.<br>**경계를 넘은 상상력**: 함께 새로운 것을 만들기 위해서는 '남과 다르게' 생각해야 합니다. 쉬운 대답 대신 깊이 묻고, 틀 밖에서 답을 찾습니다.<br>**변화 주도성**: 성장을 위해 먼저 행동하고, 새로운 길을 엽니다. 기존에 머무르지 않고, 두려움보다 가능성에 집중합니다.",
  website: "www.",
  담당업무:
    "도면 제/가정 관리, 소모품 및 사무용품 관리, 연간 고정자산 수리비 및 경비 실적 관리",
  동아리: 0.3,
  수상: 1.5,
  어학: 886,
  인턴: 0.5,
  자격증: 3.1,
  직무명: "엔지니어링",
  학점: 3.69,
};

export const Space = () => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

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

        <Sphere args={[0.1, 64, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial emissive="#fff437" opacity={1} transparent />
        </Sphere>

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
              onClick={() => setSelectedIndex(index)}
              onHover={() => setHoveredIndex(index)}
              onUnhover={() => setHoveredIndex(null)}
              opacity={hovering ? (hoveredIndex === index ? 1 : 0.3) : 1}
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
          <>
            <Line
              color="#C1C1C1"
              dashed
              dashSize={0.1}
              gapSize={0.05}
              lineWidth={1}
              points={[[0, 0, 0], hoveredPlanetPos as [number, number, number]]}
            />
            <Billboard
              position={midpoint(
                [0, 0, 0],
                hoveredPlanetPos as [number, number, number],
              )}
            >
              <Text
                anchorX="center"
                anchorY="bottom"
                color="white"
                fontSize={0.4}
                outlineColor="black"
                outlineWidth={0.005}
              >
                유사도: {renderData[hoveredIndex].userScore.toString()}
              </Text>
            </Billboard>
          </>
        )}
        <OrbitControls
          autoRotate={!hovering}
          autoRotateSpeed={0.5}
          enablePan
          enableRotate
          enableZoom
        />
      </Canvas>
      <SideModal open={typeof selectedIndex === "number"}>
        <div className="flex justify-between p-8 pb-0">
          <div className="text-lg font-medium">LG전자</div>
          <button onClick={() => setSelectedIndex(null)}>
            <XIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-scroll p-8 pt-0">
          <div className="mt-5">
            <div className="grid grid-cols-2 gap-y-4">
              {(
                [
                  {
                    key: "address",
                    label: "주소",
                  },
                  {
                    key: "avgSalary",
                    label: "평균 연봉",
                  },
                  {
                    key: "entrySalary",
                    label: "초봉",
                  },
                  {
                    key: "scale",
                    label: "기업 규모",
                  },
                  {
                    key: "traits",
                    label: "기업 특성",
                  },
                ] as const
              ).map((item) => (
                <div key={item.key}>
                  <p className="mb-0.5">{item.label}</p>
                  <p className="text-sm">
                    {overview?.[item.key] ?? "정보가 없습니다."}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <ChartRadar />
          <div className="mb-4">
            <p className="mb-0.5">인재상</p>
            <p className="text-sm">
              <Markdown>
                {overview.vision.replace(/<br\s*\/?>/gi, "\n\n")}
              </Markdown>
            </p>
          </div>
          <div>
            <p className="mb-0.5">담당 업무</p>
            <p className="text-sm">{overview["담당업무"]}</p>
          </div>
          <div className="mt-8">
            <AButton
              className="w-full"
              onClick={() =>
                sleep(3000).then(() =>
                  fetch("/sample-report.pdf")
                    .then((res) => res.blob())
                    .then((blob) => {
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "downloaded.pdf";
                      a.click();
                      URL.revokeObjectURL(url);
                    }),
                )
              }
            >
              보고서로 확인하기
            </AButton>
          </div>
        </div>
      </SideModal>
      <div className="absolute top-32 bottom-0 left-0 w-80 bg-white/7.5 p-8 text-white backdrop-blur-xs">
        <div className="text-lg font-medium">희망하는 기업을 찾아보세요</div>
        <div className="mt-5">
          <p className="mb-2">연봉</p>
          <Slider defaultValue={[33]} max={100} step={1} />
          <p className="text-secondary-foreground mt-1 text-right text-sm">
            4,000만원 이상
          </p>
        </div>
        <div className="mt-5">
          <p className="mb-2">자기소개</p>
          <Textarea placeholder="간단하게 자신을 표현해주세요" />
        </div>
        <div className="mt-5">
          <p className="mb-2">직무</p>
          <MultiSelect
            animation={2}
            defaultValue={[]}
            maxCount={3}
            onValueChange={() => {}}
            options={[]}
            placeholder="직무 선택"
            variant="inverted"
          />
        </div>
        <div className="mt-5">
          <p className="mb-2">워라밸</p>
          <Slider defaultValue={[33]} max={100} step={1} />
          <div className="text-secondary-foreground mt-1 flex justify-between text-sm">
            <p>워커홀릭</p>
            <p>워라밸</p>
          </div>
        </div>
        <div className="mt-5">
          <p className="mb-2">기업 규모</p>
          <RadioGroup defaultValue="big">
            {[
              {
                label: "대기업",
                value: "big",
              },
              {
                label: "중소기업",
                value: "medium",
              },
              {
                label: "스타트업",
                value: "startup",
              },
            ].map((item) => (
              <div className="flex items-center gap-3" key={item.value}>
                <RadioGroupItem id={item.value} value={item.value} />
                <Label htmlFor={item.value}>{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

const Planet = ({
  color,
  onClick,
  onHover,
  onUnhover,
  opacity,
  position,
  radius,
}: {
  color: string;
  onClick?: () => void;
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
        onClick={onClick}
        onPointerOut={onUnhover}
        onPointerOver={onHover}
        position={position}
      >
        <sphereGeometry args={[radius * 5, 16, 16]} />
        <meshBasicMaterial depthWrite={false} opacity={0} transparent />
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
