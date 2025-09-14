import { useContext, useEffect, useState } from "react";
import { UnitContext } from "../Contexts/UnitsContext";
import { DropDown, Logo, Moon, Sun, Units } from "../svg";
import { UnitSelector } from "./UnitSelector";
import type { PrecipitationUnit, TemperatureUnit, WindUnit } from "../types";
import { ThemeContext } from "../Contexts/ThemeContext";

export const Header = ({error} : {error : boolean}) => {
    
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

  const [dropDown,setDropDown] = useState<boolean>(false);
  const [display,setDisplay] = useState<boolean>(false);

  useEffect(() => {

    if(dropDown){
      setDisplay(true);
      return;
    }

    setTimeout(() => {
      setDisplay(dropDown && !error)
    },560)
  },[dropDown,error]);

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
      <Logo />
      <div onClick={() => setDropDown((prev : boolean) => !prev)} className="units">
        <Units />
        <p>Settings</p>
        <DropDown />
      </div>
      <div style={{display : display ? "flex" : "none"}} className={`dropDown${dropDown ? "" : " fadeout"}`}>

        <button className="theme animated" onClick={switchTheme} >
          <p>Switch Theme</p>
          <Sun/>
          <Moon />          
        </button>

        <div className="units">
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
