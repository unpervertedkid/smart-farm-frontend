interface CropRecommendationRequestInterface {
  location: LocationInterface;
  plantingDate: Date;
}

interface LocationInterface {
  latitude: number;
  longitude: number;
}

interface CropRecommendationResponseInterface {
  crops: [crop: CropRecommendtionInterface];
}
type Crop = string;

interface CropRecommendtionInterface {
  name: Crop;
  confidence: number;
}

/**
 * Fetches crop recommendations based on the provided location and planting date.
 *
 * @param {CropRecommendationRequestInterface} request - The request payload containing location and planting date.
 * @returns {Promise<CropRecommendationResponseInterface>} - A promise that resolves to the crop recommendation response.
 */
export function getCropRecommendation(
  request: CropRecommendationRequestInterface
): Promise<CropRecommendationResponseInterface> {
  // TODO: Implement the API call
  return fetch("https://api.example.com/recommendation", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

interface PlantTimeRecommendationRequestInterface {
  location: LocationInterface;
  crop: Crop;
}

interface PlantTimeRecommendationResponseInterface {
    dateRanges: [dateRange: DateRangeInterface];
}

interface DateRangeInterface {
  startDate: Date;
  endDate: Date;
}

/**
 * Fetches plant time recommendations based on the provided location and crop.
 *
 * @param {PlantTimeRecommendationRequestInterface} request - The request payload containing location and crop.
 * @returns {Promise<PlantTimeRecommendationResponseInterface>} - A promise that resolves to the plant time recommendation response.
 */
export function getPlantTimeRecommendation(
    request: PlantTimeRecommendationRequestInterface
): Promise<PlantTimeRecommendationResponseInterface> {
    // TODO: Implement the API call
    return fetch("https://api.example.com/plant-time", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}
