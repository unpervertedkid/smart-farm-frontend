import { AnalyticsResponseInterface } from "@/api/analyticsAPI";
import { LineChart } from '@tremor/react';

interface DayAnalytics {
    date: string;
    CropRecommendation: number;
    PlantTimeRecommendation: number;
    UnsupportedErrors: number;
    ClientErrors: number;
    ServerErrors: number;
}

export function LineChartHero({ data }: { data: AnalyticsResponseInterface[] }) {
    const groupedData = data.reduce((acc, curr) => {
        const date = curr.requestTime.toISOString().split('T')[0]; // Strip time from date
        if (!acc[date]) {
            acc[date] = { date, CropRecommendation: 0, PlantTimeRecommendation: 0, UnsupportedErrors: 0, ClientErrors: 0, ServerErrors: 0 };
        }
        if (curr.feature === "Crop Recommendation") {
            acc[date].CropRecommendation += 1;
        } else if (curr.feature === "Plant Time Recommendation") {
            acc[date].PlantTimeRecommendation += 1;
        } else if (curr.errorReason) {
            if (curr.errorReason === "unsupported") {
                acc[date].UnsupportedErrors += 1;
            } else if (curr.errorReason === "client-error") {
                acc[date].ClientErrors += 1;
            } else if (curr.errorReason === "server-error") {
                acc[date].ServerErrors += 1;
            }
        }
        return acc;
    }, {} as Record<string, DayAnalytics>);

    const chartdata = Object.values(groupedData);

    return (
        <LineChart
            className="h-80"
            data={chartdata}
            index="date"
            categories={['CropRecommendation', 'PlantTimeRecommendation', 'UnsupportedErrors', 'ClientErrors', 'ServerErrors']}
            colors={['green', 'blue', 'purple', 'orange', 'red']}
            yAxisWidth={10}
            onValueChange={(v) => console.log(v)}
        />
    );
}