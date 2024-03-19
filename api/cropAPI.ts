export interface CropsResponseInterface {
  status: number;
  errorMessage?: string;
  crops: string[];
}

export async function getCrops(): Promise<CropsResponseInterface> {
  const response = await fetch(
    "https://smart-farm-backend-iuns2ztryq-bq.a.run.app/crops",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let crops: string[] = [];
  if (response.ok) {
    const data = await response.json();
    crops = data;
  }

  return {
    crops: crops,
    status: response.status,
    errorMessage: response.statusText,
  };
}
