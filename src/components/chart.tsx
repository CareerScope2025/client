import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const dummy = [
  { company: 2, label: "동아리", user: 0 },
  { company: 5, label: "수상", user: 7 },
  { company: 9.6, label: "어학", user: 8.7 },
  { company: 1, label: "인턴", user: 2 },
  { company: 1, label: "자격증", user: 2 },
  { company: 4, label: "학점", user: 3.7 },
];

const chartConfig = {
  company: {
    color: "var(--chart-1)",
    label: "합격자 평균",
  },
  user: {
    color: "var(--chart-2)",
    label: "사용자",
  },
} satisfies ChartConfig;

export function ChartRadar({
  chartData = dummy,
}: {
  chartData?: {
    company: number;
    label: string;
    user: number;
  }[];
}) {
  return (
    <ChartContainer
      className="mx-auto aspect-square max-h-[250px]"
      config={chartConfig}
    >
      <RadarChart data={chartData}>
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <PolarAngleAxis dataKey="label" />
        <PolarGrid />
        <Radar
          dataKey="company"
          fill="var(--color-company)"
          fillOpacity={0.6}
        />
        <Radar dataKey="user" fill="var(--color-user)" fillOpacity={0.6} />
      </RadarChart>
    </ChartContainer>
  );
}
