/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { useAuth } from "~/hoc/auth";
import { client } from "~/lib/client";

export const Register = () => {
  const { setToken } = useAuth();
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
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const data = {
              awardsCount: formData.get("awardsCount"),
              certificationCount: formData.get("certificationCount"),
              clubActivityCount: formData.get("clubActivityCount"),
              email: formData.get("email"),
              englishScores: formData.get("englishScores"),
              experienceYears: formData.get("experienceYears"),
              gpa: formData.get("gpa"),
              internshipCount: formData.get("internshipCount"),
              name: formData.get("name"),
              password: formData.get("password"),
              schoolName: formData.get("schoolName"),
            };
            await client
              .post("auth/signup", {
                json: {
                  email: data.email,
                  name: data.name,
                  password: data.password,
                },
              })
              .json<{ user: string }>();

            const { accessToken: token } = await client
              .post("auth/login", {
                json: {
                  email: data.email,
                  password: data.password,
                },
              })
              .json<{
                accessToken: string;
              }>();

            await client
              .post("user/survey", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                json: {
                  awardsCount: data.awardsCount,
                  certificationCount: data.certificationCount,
                  clubActivityCount: data.clubActivityCount,
                  englishScores: data.englishScores,
                  experienceYears: data.experienceYears,
                  gpa: data.gpa,
                  internshipCount: data.internshipCount,
                  schoolName: data.schoolName,
                },
              })
              .json();

            setToken(token);
          }}
        >
          <p className="text-lg">회원가입</p>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="name">이름</Label>
            <Input id="name" name="name" type="text" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" name="email" type="email" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" name="password" type="password" />
          </div>
          <Separator className="my-8" />
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="gpa">학점</Label>
            <Input id="gpa" name="gpa" type="number" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="englishScores">어학 성적 (토익 점수)</Label>
            <Input id="englishScores" name="englishScores" type="number" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="certificationCount">자격증 개수</Label>
            <Input
              id="certificationCount"
              name="certificationCount"
              type="number"
            />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="internshipCount">인턴 횟수</Label>
            <Input id="internshipCount" name="internshipCount" type="number" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="clubActivityCount">동아리 횟수</Label>
            <Input
              id="clubActivityCount"
              name="clubActivityCount"
              type="number"
            />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="awardsCount">수상 횟수</Label>
            <Input id="awardsCount" name="awardsCount" type="number" />
          </div>
          <div className="mt-5 grid w-full items-center gap-3">
            <Label htmlFor="schoolName">최종 학벌</Label>
            <Select name="schoolName">
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
            <Input id="experienceYears" name="experienceYears" type="number" />
          </div>
          <Button className="mt-8 mb-5">제출</Button>
        </form>
      </div>
    </div>
  );
};
