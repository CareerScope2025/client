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
import { useDeferredValue, useMemo, useState } from "react";
import Markdown from "react-markdown";
import useSWR from "swr";

import { AButton } from "~/components/a-button";
import { ChartRadar } from "~/components/chart";
import { Label } from "~/components/ui/label";
import { MultiSelect } from "~/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { SideModal } from "~/components/ui/side-modal";
import { Slider } from "~/components/ui/slider";
import { Textarea } from "~/components/ui/textarea";
import { useAuth } from "~/hoc/auth";
import { getRandomColor, getRandomVector, midpoint } from "~/lib/utils";

export const Space = () => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const [p, sp] = useState({
    introduction: "",
    jobs: [] as string[],
    salary: 4000,
    scale: "대기업" as "공기업" | "대기업" | "스타트업" | "중소기업",
    traits: 0.5,
  });
  const { client } = useAuth();
  const delayed = useDeferredValue(p);

  const { data } = useSWR(
    [`user-preference`, delayed],
    ([url, json]) =>
      client.post(url, { json }).json<
        {
          companyAwards: number;
          companyCertification: number;
          companyClubActivity: number;
          companyEnglish: number;
          companyGpa: number;
          companyId: string;
          companyInternship: number;
          companyName: string;
          finalScore: number;
          jobName: string;
          salary: string;
          userAwards: number;
          userCertification: number;
          userClubActivity: number;
          userEnglish: number;
          userGpa: number;
          userInternship: number;
          vision: string;
        }[]
      >(),
    {
      keepPreviousData: true,
    },
  );

  const renderData = useMemo(
    () =>
      data?.map((item) => ({
        color: getRandomColor(100),
        id: item.companyId,
        name: item.companyName,
        position: getRandomVector(1).map(
          (v) => v * (1 - item.finalScore) * 6,
        ) as [number, number, number],
        userScore: item.finalScore,
      })) ??
      ([] as {
        color: string;
        id: string;
        name: string;
        position: [number, number, number];
        userScore: number;
      }[]),
    [data],
  );

  const overview = useMemo(() => {
    if (typeof selectedIndex !== "number") return null;
    return data?.[selectedIndex];
  }, [selectedIndex, data]);

  const hovering = typeof hoveredIndex === "number";
  const hoveredPlanetPos =
    hoveredIndex !== null ? renderData[hoveredIndex].position : [0, 0, 0];
  useCursor(hovering, "pointer");

  return (
    <div className="relative h-screen w-screen bg-black">
      <div className="absolute top-10 left-10 z-10 font-serif text-4xl text-white">
        CareerScope.
      </div>
      <Canvas camera={{ fov: 45, position: [5, 5, 10] }}>
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
          factor={8}
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
                유사도:{" "}
                {Math.round(renderData[hoveredIndex].userScore * 100) / 100}
              </Text>
            </Billboard>
          </>
        )}
        <OrbitControls
          autoRotate={!hovering}
          autoRotateSpeed={2}
          enablePan
          enableRotate
          enableZoom
        />
      </Canvas>
      <SideModal open={typeof selectedIndex === "number"}>
        <div className="flex justify-between p-8 pb-0">
          <div className="text-lg font-medium">{overview?.companyName}</div>
          <button onClick={() => setSelectedIndex(null)}>
            <XIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-scroll p-8 pt-0">
          <div className="mt-5 mb-5">
            <div className="grid grid-cols-2 gap-y-4">
              {(
                [
                  {
                    key: "salary",
                    label: "연봉",
                  },
                  {
                    key: "jobName",
                    label: "직무",
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
          <ChartRadar
            chartData={[
              {
                company: overview?.companyAwards ?? 0,
                label: "수상",
                user: overview?.userAwards ?? 0,
              },
              {
                company: overview?.companyCertification ?? 0,
                label: "자격증",
                user: overview?.userCertification ?? 0,
              },
              {
                company: overview?.companyClubActivity ?? 0,
                label: "동아리",
                user: overview?.userClubActivity ?? 0,
              },
              {
                company: (overview?.companyEnglish ?? 0) / 400,
                label: "어학",
                user: (overview?.userEnglish ?? 0) / 400,
              },
              {
                company: overview?.companyGpa ?? 0,
                label: "학점",
                user: overview?.userGpa ?? 0,
              },
              {
                company: overview?.companyInternship ?? 0,
                label: "인턴",
                user: overview?.userInternship ?? 0,
              },
            ]}
          />
          <div className="mb-4">
            <p className="mb-0.5">인재상</p>
            <p className="text-sm">
              <Markdown>
                {overview?.vision.replace(/<br\s*\/?>/gi, "\n\n")}
              </Markdown>
            </p>
          </div>
          <div className="mt-8">
            <AButton
              className="w-full"
              onClick={() =>
                fetch("/samsung.pdf")
                  .then((res) => res.blob())
                  .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "삼성 맞춤 취업 보고서.pdf";
                    a.click();
                    URL.revokeObjectURL(url);
                  })
              }
            >
              보고서로 확인하기
            </AButton>
          </div>
        </div>
      </SideModal>
      <form className="absolute top-32 bottom-0 left-0 w-80 bg-white/7.5 p-8 text-white backdrop-blur-xs">
        <div className="text-lg font-medium">희망하는 기업을 찾아보세요</div>
        <div className="mt-5">
          <p className="mb-2">연봉</p>
          <Slider
            defaultValue={[p.salary]}
            max={10000}
            min={2000}
            onValueChange={(value) => {
              sp((prev) => ({
                ...prev,
                salary: value[0],
              }));
            }}
            step={100}
          />
          <p className="text-secondary-foreground mt-1 text-right text-sm">
            {p.salary.toLocaleString()}만원 이상
          </p>
        </div>
        <div className="mt-5">
          <p className="mb-2">자기소개</p>
          <Textarea
            onChange={(e) => {
              sp((prev) => ({
                ...prev,
                introduction: e.target.value,
              }));
            }}
            placeholder="간단하게 자신을 표현해주세요"
          />
        </div>
        <div className="mt-5">
          <p className="mb-2">직무</p>
          <MultiSelect
            animation={2}
            defaultValue={[]}
            maxCount={3}
            onValueChange={(value) => {
              sp((prev) => ({
                ...prev,
                jobs: value,
              }));
            }}
            options={[
              "금융/재무",
              "마케팅/시장조사",
              "생산/제조",
              "생산관리/품질관리",
              "엔지니어링",
              "영업/제휴",
              "인사/총무",
              "전문직",
              "기획/경영",
              "개발",
              "연구개발",
              "유통/무역",
              "데이터",
              "서비스/고객지원",
              "디자인",
            ].map((job) => ({
              label: job,
              value: job,
            }))}
            placeholder="직무 선택"
            variant="inverted"
          />
        </div>
        <div className="mt-5">
          <p className="mb-2">워라밸</p>
          <Slider
            defaultValue={[p.traits]}
            max={1}
            onValueChange={(value) => {
              sp((prev) => ({
                ...prev,
                traits: value[0],
              }));
            }}
            step={0.01}
          />
          <div className="text-secondary-foreground mt-1 flex justify-between text-sm">
            <p>워커홀릭</p>
            <p>워라밸</p>
          </div>
        </div>
        <div className="mt-5">
          <p className="mb-2">기업 규모</p>
          <RadioGroup
            defaultValue={p.scale}
            onValueChange={(val) => {
              sp((prev) => ({
                ...prev,
                scale: val as "공기업" | "대기업" | "스타트업" | "중소기업",
              }));
            }}
          >
            {["대기업", "중견기업", "스타트업", "공기업"].map((item) => (
              <div className="flex items-center gap-3" key={item}>
                <RadioGroupItem id={item} value={item} />
                <Label htmlFor={item}>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </form>
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
