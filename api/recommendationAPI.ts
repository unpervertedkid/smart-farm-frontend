export interface CropRecommendationRequestInterface {
  location: LocationInterface;
  plantingDate: Date;
}

interface LocationInterface {
  latitude: number;
  longitude: number;
}

interface CropRecommendationResponseInterface {
  status: number;
  crops: CropRecommendtionInterface[];
  errorMessage?: string;
}

interface CropRecommendtionInterface {
  crop: string;
  confidence: number;
}

export async function getCropRecommendation(
  request: CropRecommendationRequestInterface
): Promise<CropRecommendationResponseInterface> {
  const response = await fetch("https://smart-farm-backend-iuns2ztryq-bq.a.run.app/crop-recommendations", {
    method: "POST",
    body: JSON.stringify({
      latitude: request.location.latitude,
      longitude: request.location.longitude
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response)
  let crops: CropRecommendtionInterface[] = [];
  if (response.ok) {
    const data = await response.json();
    crops = data.map((item: any) => ({
      crop: item.crop,
      confidence: item.confidence,
    }));
  }

  return {
    status: response.status,
    crops: crops,
    errorMessage: response.statusText,
  };
}

export interface PlantTimeRecommendationRequestInterface {
  location: LocationInterface;
  crop: string;
}

interface PlantTimeRecommendationResponseInterface {
    status: number;
    errorMessage?: string;
    dateRanges: DateRangeInterface[];
}

interface DateRangeInterface {
  startDate: Date;
  endDate: Date;
}

/**
 * Retrieves plant time recommendation based on the provided request.
 * @param request - The request object containing location and crop information.
 * @returns A promise that resolves to the plant time recommendation response.
 */
export async function getPlantTimeRecommendation(
  request: PlantTimeRecommendationRequestInterface
): Promise<PlantTimeRecommendationResponseInterface> {
  const response = await fetch(
    "https://smart-farm-backend-iuns2ztryq-bq.a.run.app/plant-time-recommendations",
    {
      method: "POST",
      body: JSON.stringify({
        latitude: request.location.latitude,
        longitude: request.location.longitude,
        crop: request.crop,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let dateRanges: DateRangeInterface[] = [];
  const data = await response.json();

  if (response.ok) {
      dateRanges = data.map((item: any) => ({
        startDate: new Date(item.start_date),
        endDate: new Date(item.end_date),
      }));
  }

  return {
    status: response.status,
    dateRanges: dateRanges,
    errorMessage: response.statusText,
  };
}