import { getAnalytics, AnalyticsResponseInterface } from "@/api/analyticsAPI";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    Barcode,
    CalendarDays,
    CircleCheckBig,
    Leaf
} from "lucide-react"
import { LineChartHero } from "@/components/chart"
import { useEffect, useState } from "react"
const recommendations = [
    {
        feature: "Crop recommendation",
        status: "Success"
    },
    {
        feature: "Plant time recommendation",
        status: "Success"
    },
    {
        feature: "Crop recommendation",
        status: "Client Error"
    },
    {
        feature: "Plant time recommendation",
        status: "Unsupported"
    },
    {
        feature: "Crop recommendation",
        status: "Success"
    },
]


export function Analytics() {
    type AnalyticsStatus = "Loading" | "Success" | "Error";
    const [analyticsStatus, setAnalyticsStatus] = useState<AnalyticsStatus>("Loading");
    const [analyticsData, setAnalyticsData] = useState<AnalyticsResponseInterface[]>([]);

    useEffect(() => {
        getAnalytics().then((data) => {
            setAnalyticsData(data);
            console.log(analyticsData);
            setAnalyticsStatus("Success");
        }).catch((error) => {
            console.log(error);
            setAnalyticsStatus("Error");
        });
    }, []); // empty dependency array

    return (
        <div>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Recommendations
                            </CardTitle>
                            <Barcode className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">150</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Crop Recommendations</CardTitle>
                            <Leaf className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Plant Time Recommendations</CardTitle>
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Successful Recommendations</CardTitle>
                            <CircleCheckBig className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card className="xl:col-span-2">
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Recommendations Chart</CardTitle>
                                <CardDescription>
                                    Recommendations trends over time.
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <LineChartHero />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            <Table>
                                <TableCaption>A list of  recent recommendations.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Feature</TableHead>
                                        <TableHead className="text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recommendations.map((recommendation) => (
                                        <TableRow key={recommendation.status}>
                                            <TableCell className="font-medium">{recommendation.feature}</TableCell>
                                            <TableCell className="text-right">{recommendation.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}