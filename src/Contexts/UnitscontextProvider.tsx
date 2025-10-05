import { useEffect, useState, type JSX } from "react";
import { UnitContext } from "./UnitsContext";
import type { Modes, PrecipitationUnit, TemperatureUnit, WindUnit } from "../types";


export const UnitContextProvider = ({ children }: { children: JSX.Element }) => {

  const [mode,setMode] = useState<Modes>('metric');

  const[temperatureUnit,setTemperatureUnit] = useState<TemperatureUnit>('celsius');
  const [windSpeedUnit,setWindSpeedUnit] = useState<WindUnit>('kmh');
  const [precipitationUnit,setPrecipitationUnit] = useState<PrecipitationUnit>('mm');

  useEffect(() => {
    
    if(mode === 'imperial'){
      setTemperatureUnit('fahrenheit');
      setWindSpeedUnit('mph');
      setPrecipitationUnit('inch');
    }

    else{
      setTemperatureUnit('celsius');
      setWindSpeedUnit('kmh');
      setPrecipitationUnit('mm');
    }

  },[mode])

  return (
    <UnitContext.Provider
      value={{
        temperatureUnit,
        windSpeedUnit,
        precipitationUnit,
        setTemperatureUnit,
        setWindSpeedUnit,
        setPrecipitationUnit,
        mode, setMode // optional shortcut
      }}
    >
      {children}
    </UnitContext.Provider>
  );
};
