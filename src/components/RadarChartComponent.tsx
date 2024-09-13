"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart"

const chartData = [
    { dag: "Maa", werknemers: 186 },
    { dag: "Din", werknemers: 305 },
    { dag: "Woe", werknemers: 237 },
    { dag: "Don", werknemers: 273 },
    { dag: "Vri", werknemers: 209 },
    { dag: "Zat", werknemers: 214 },
    { dag: "Zon", werknemers: 136 },
]

const chartConfig = {
    werknemers: {
        label: "Werknemers",
        color: "#0084D4",
    },
} satisfies ChartConfig

export function RadarChartComponent() {
    return (
        <Card>
            <CardHeader className="items-center pb-4">
                <CardTitle>Beschikbaarheid van werknemers</CardTitle>
                <CardDescription>
                    Week 13
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="dag" />
                        <PolarGrid />
                        <Radar
                            dataKey="werknemers"
                            fill="var(--color-werknemers)"
                            fillOpacity={0.7}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default RadarChartComponent;
