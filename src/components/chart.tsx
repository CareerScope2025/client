import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { type ChartConfig, ChartContainer } from "~/components/ui/chart";

export const description = "A radar chart";

const chartData = [
  { desktop: 186, month: "January" },
  { desktop: 305, month: "February" },
  { desktop: 237, month: "March" },
  { desktop: 273, month: "April" },
  //   { desktop: 209, month: "May" },
  { desktop: 214, month: "June" },
];

const chartConfig = {
  desktop: {
    color: "var(--chart-1)",
    label: "Desktop",
  },
} satisfies ChartConfig;

export function ChartRadar() {
  return (
    <ChartContainer
      className="mx-auto aspect-square max-h-[250px]"
      config={chartConfig}
    >
      <RadarChart data={chartData}>
        <PolarAngleAxis dataKey="month" />
        <PolarGrid />
        <Radar
          dataKey="desktop"
          fill="var(--color-desktop)"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ChartContainer>
  );
}
