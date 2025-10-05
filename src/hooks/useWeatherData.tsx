import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Contexts/DataContext";
import type {
  WeatherResponse,
  WeatherCardsData,
  City,
  GeocodingResponse,
} from "../types";
import { LoadingContext } from "../Contexts/LoadingContext";
import { UnitContext } from "../Contexts/UnitsContext";

let index = 0;

export const useWeatherData = (
  city: City,
  setCities: React.Dispatch<React.SetStateAction<GeocodingResponse | undefined>>,
  throwError: (err: Error) => void
) => {
  const { data, setData } = useContext(DataContext);
  const { windSpeedUnit, precipitationUnit, temperatureUnit } =
    useContext(UnitContext);
  const { setLoadingWeather } = useContext(LoadingContext);


  const [weatherCardsData, setWeatherCardsData] = useState<WeatherCardsData>({
    apparent_temperature: undefined,
    humidity: undefined,
    wind: undefined,
    precipitation: undefined,
    uvIndex: undefined,
    visibility: undefined,
    pressure: undefined,
    precipitationProbability: undefined,
  });

  useEffect(() => {

    if (data) {
      const date: string = new Date()
        .toISOString()
        .split(":")
        .slice(0, 1)
        .join(":");

      data?.hourly?.time?.forEach((time, index) => {
        if (time.startsWith(date)) {
          const visibility =
            data.hourly.visibility?.[index] < 1000
              ? data.hourly.visibility?.[index]
              : data.hourly.visibility?.[index] / 1000;

          setWeatherCardsData({
            apparent_temperature:
              Math.round(data.hourly.apparent_temperature?.[index]).toString() +
              `°`,
            humidity:
              Math.round(data.hourly.relative_humidity_2m?.[index]).toString() +
              `%`,
            wind:
              Math.round(data.hourly.wind_speed_10m?.[index]).toString() +
              ` ${windSpeedUnit === "kmh" ? "km/h" : windSpeedUnit}`,
            precipitation:
              data.hourly.precipitation?.[index].toString() +
              ` ${precipitationUnit === "inch" ? "in" : precipitationUnit}`,
            uvIndex: Math.round(data.hourly.uv_index?.[index]).toString(),
            visibility: Math.round(visibility).toString() + ` km`,
            pressure:
              Math.round(data.hourly.pressure_msl?.[index]).toString() + ` hPa`,
            precipitationProbability:
              Math.round(
                data.hourly.precipitation_probability?.[index]
              ).toString() + ` %`,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        index += 1;
        if (!city || Object.keys(city).length === 0 || !navigator.onLine)
          throw new Error("No city selected or no internet connection");

        setData(undefined);
        setCities(undefined);
        setLoadingWeather(true);
        let link = `https://api.open-meteo.com/v1/forecast?current_weather=true&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,visibility,precipitation_probability,uv_index,pressure_msl&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&timezone=auto`;
        link += "&latitude=" + city.lat + "&longitude=" + city.long;
        link += "&wind_speed_unit=" + windSpeedUnit;
        link += "&precipitation_unit=" + precipitationUnit;
        link += "&temperature_unit=" + temperatureUnit;

        const response = await fetch(link, { method: "GET" });
        const body: WeatherResponse = await response.json();

        setData(body);
        setTimeout(() => {
          setLoadingWeather(false);
        }, 1000);
      } catch (err) {
        setLoadingWeather(false);
        if (index >= 3) throwError(err as Error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperatureUnit, windSpeedUnit, precipitationUnit, city]);

  return { weatherCardsData };
};
