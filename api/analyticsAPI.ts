export interface AnalyticsPostRequestInterface {
    feature: "Crop Recommendation" | "Plant Time Recommendation";
    requestStatus: "success" | "error";
    errorReason?: "unsupported" | "client-error" | "server-error";
    }

export async function postAnalytics(
    data: AnalyticsPostRequestInterface
): Promise<Response> {
    const response = await fetch(
        `api/add-analytic?feature=${data.feature}&requestStatus=${data.requestStatus}&errorReason=${data.errorReason}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response;
}

export interface AnalyticsResponseInterface {
    requestTime: Date;
    feature: "Crop Recommendation" | "Plant Time Recommendation";
    requestStatus: "success" | "error";
    errorReason?: "unsupported" | "client-error" | "server-error";
    }

export async function getAnalytics(): Promise<AnalyticsResponseInterface[]> {
    const response = await fetch("api/get-analytics");
    console.log(response);

    let analytics: AnalyticsResponseInterface[] = [];
    if (response.ok) {
        const data = await response.json();
        analytics = data.analytics.rows.map(row => ({
            requestTime: new Date(row.request_time),
            feature: row.feature,
            requestStatus: row.request_status,
            errorReason: row.error_reason !== "undefined" ? row.error_reason : undefined,
        }));
    }

    return analytics;
}