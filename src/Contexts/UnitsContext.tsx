import { createContext } from "react";
import type { PrecipitationUnit, TemperatureUnit, WindUnit, Modes } from "../types";

interface Units {
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindUnit;
  precipitationUnit: PrecipitationUnit;
  setTemperatureUnit: React.Dispatch<React.SetStateAction<TemperatureUnit>>;
  setWindSpeedUnit: React.Dispatch<React.SetStateAction<WindUnit>>;
  setPrecipitationUnit: React.Dispatch<React.SetStateAction<PrecipitationUnit>>;
  mode : Modes;
  setMode : React.Dispatch<React.SetStateAction<Modes>>;
}

export const UnitContext = createContext<Units>({} as Units);

