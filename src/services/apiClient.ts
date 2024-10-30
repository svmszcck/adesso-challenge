import axios from "axios";
import type { AxiosResponse } from "axios";
import Constants from "expo-constants";

import { DataFormat } from "./types";

const apiHost = Constants.expoConfig?.extra?.apiHost;
const apiKey = Constants.expoConfig?.extra?.apiKey;

const apiClient = axios.create({
  baseURL: `https://${apiHost}`,
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": apiHost,
  },
  params: {
    r: "json",
  } satisfies { r: DataFormat },
});

export const getData = <ApiResponse>(
  url: string,
  params?: Record<string, unknown>
): Promise<AxiosResponse<ApiResponse>> => {
  return apiClient.get<ApiResponse>(url, { params });
};

export const postData = <ApiResponse>(
  data: unknown
): Promise<AxiosResponse<ApiResponse>> => {
  return apiClient.post("/data", data);
};
