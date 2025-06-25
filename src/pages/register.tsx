import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";

export const Register = () => {
  return (
    <div>
      <div className="fixed inset-0 bg-black">
        <Canvas camera={{ fov: 45, position: [5, 5, 10] }}>
          <Stars
            count={3000}
            depth={50}
            factor={8}
            fade
            radius={100}
            saturation={0}
          />
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enablePan={false}
            enableRotate={false}
            enableZoom={false}
          />
        </Canvas>
      </div>
      <div className="relative z-10 mx-auto w-[480px] p-5">
        <div className="py-8 pl-1 font-serif text-4xl text-white">
          CareerScope.
        </div>
        <form
          autoComplete="off"
          className="mt-5 bg-white/7.5 p-8 text-white backdrop-blur-xs"
        >
          <p className="text-lg">회원가입</p>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="name">이름</Label>
            <Input id="name" type="text" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" />
          </div>
          <Separator className="my-8" />
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="gpa">학점</Label>
            <Input id="gpa" type="number" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="englishScores">어학 성적 (토익 점수)</Label>
            <Input id="englishScores" type="number" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="certificationCount">자격증 개수</Label>
            <Input id="certificationCount" type="number" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="internshipCount">인턴 횟수</Label>
            <Input id="internshipCount" type="number" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="clubActivityCount">동아리 횟수</Label>
            <Input id="clubActivityCount" type="number" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="awardsCount">수상 횟수</Label>
            <Input id="awardsCount" type="number" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="schoolName">최종 학벌</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="최종 학벌 선택" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "서울4년",
                  "수도권4년",
                  "지방4년",
                  "초대졸",
                  "대학원",
                  "해외대학",
                  "대졸4년",
                  "고졸",
                ].map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="experienceYears">경력</Label>
            <Input id="experienceYears" type="number" />
          </div>
          <Button className="mt-8 mb-5">제출</Button>
        </form>
      </div>
    </div>
  );
};
