"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart.tsx"

export const description = "A multiple bar chart"

const chartData = [
    { dag: "Maa", werknemers: 186 },
    { dag: "Din", werknemers: 305 },
    { dag: "Woe", werknemers: 237 },
    { dag: "Don", werknemers: 73 },
    { dag: "Vri", werknemers: 209 },
    { dag: "Zat", werknemers: 214 },
    { dag: "Zon", werknemers: 136 },
]

const chartConfig = {
    werknemers: {
        label: "werknemers",
        color: "#0084D4",
    }
} satisfies ChartConfig

export function BarChartComponent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Aantal werknemers per dag</CardTitle>
                <CardDescription>Week 12</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="dag"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />

                        <Bar dataKey="werknemers" fill="var(--color-werknemers)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default BarChartComponent;
