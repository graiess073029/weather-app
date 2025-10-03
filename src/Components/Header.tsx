import { useContext } from "react";
import { UnitContext } from "../Contexts/UnitsContext";
import { DropDown, Logo, Moon, Sun, Units } from "../infos/svg";
import { UnitSelector } from "./UnitSelector";
import type { PrecipitationUnit, TemperatureUnit, WindUnit } from "../types";
import { ThemeContext } from "../Contexts/ThemeContext";

export const Header = ({error,dropDown,setDropDown} : {error : boolean,dropDown : boolean,setDropDown : React.Dispatch<React.SetStateAction<boolean>>}) => {
    
  const {
    temperatureUnit,
    windSpeedUnit,
    precipitationUnit,
    setTemperatureUnit,
    setWindSpeedUnit,
    setPrecipitationUnit,
    mode,
    setMode,
  } = useContext(UnitContext);

  const {setTheme} = useContext(ThemeContext);


  const switchTheme = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur()
    setTheme((prev: string) => prev === "light" ? "dark" : "light");
  };

  const switchMode = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur()
    setMode(mode === "metric" ? "imperial" : "metric");
  };

  return (
    <header>
      <a href="/"><Logo /></a>
      <button onClick={(event : React.MouseEvent<HTMLButtonElement>) => {setDropDown((prev : boolean) => !prev);event.currentTarget.blur();}} className="units">
        <Units />
        <p>Settings</p>
        <DropDown />
      </button>
      <div style={{display : dropDown ? "flex" : "none"}} className={`dropDown${dropDown ? "" : " fadeout"}`}>

        <button className="theme animated" onClick={switchTheme} >
          <p>Switch Theme</p>
          <Sun/>
          <Moon />          
        </button>

        <div style={{display : !error ? "flex" : "none"}} className="units">
        <button className="animated" onClick={switchMode}>
          <p className="switchMode">Switch to {mode === "metric" ? "imperial" : "metric"}</p>
        </button>

        <p>Temperature</p>

        <UnitSelector<TemperatureUnit>
          state={temperatureUnit}
          setState={setTemperatureUnit}
          newVal="celsius"
          content="Celsius (°C)"
        />
        <UnitSelector<TemperatureUnit>
          state={temperatureUnit}
          setState={setTemperatureUnit}
          newVal="fahrenheit"
          content="Fahrenheit (°F)"
        />

        <p>Wind Speed</p>

        <UnitSelector<WindUnit> state={windSpeedUnit} setState={setWindSpeedUnit} content="km/h" newVal="kmh" />
        <UnitSelector<WindUnit> state={windSpeedUnit} setState={setWindSpeedUnit} content="mph" newVal="mph" />

        <p>Precipitation</p>

        <UnitSelector<PrecipitationUnit> state={precipitationUnit} setState={setPrecipitationUnit} content="Millimeters (mm)" newVal="mm" />
        <UnitSelector<PrecipitationUnit> state={precipitationUnit} setState={setPrecipitationUnit} content="Inches (in)" newVal="inch" />
        </div>
      </div>
    </header>
  );
};
