import { createContext } from "react";
import type { WeatherResponse } from "../types";

interface dataState {
  data : WeatherResponse | undefined, 
  setData : React.Dispatch<React.SetStateAction<WeatherResponse | undefined>>
}

export const DataContext = createContext<dataState>({} as dataState);
