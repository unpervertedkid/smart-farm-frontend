import { LineChart } from '@tremor/react';

interface DayAnalytics {
    date: string;
    CropRecommendation: number;
    PlantTimeRecommendation: number;
    UnsupportedErrors: number;
    ClientErrors: number;
}
const chartdata: DayAnalytics[] = [
    {
        date: 'Jan 22',
        CropRecommendation: 10,
        PlantTimeRecommendation: 5,
        UnsupportedErrors: 2,
        ClientErrors: 0,
    },
    {
        date: 'Feb 22',
        CropRecommendation: 25,
        PlantTimeRecommendation: 10,
        UnsupportedErrors: 5,
        ClientErrors: 1,
    },
    {
        date: 'Mar 22',
        CropRecommendation: 30,
        PlantTimeRecommendation: 15,
        UnsupportedErrors: 7,
        ClientErrors: 2,
    },
    {
        date: 'Apr 22',
        CropRecommendation: 45,
        PlantTimeRecommendation: 20,
        UnsupportedErrors: 10,
        ClientErrors: 3,
    },
    {
        date: 'May 22',
        CropRecommendation: 60,
        PlantTimeRecommendation: 25,
        UnsupportedErrors: 15,
        ClientErrors: 5,
    },
];


export function LineChartHero() {
    return (
        <LineChart
            className="h-80"
            data={chartdata}
            index="date"
            categories={['CropRecommendation', 'PlantTimeRecommendation', 'UnsupportedErrors', 'ClientErrors']}
            colors={['indigo', 'rose', 'green', 'blue']}
            yAxisWidth={10}
            onValueChange={(v) => console.log(v)}
        />
    );
}