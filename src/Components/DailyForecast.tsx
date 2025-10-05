import { useContext, type JSX } from "react";
import { LoadingContext } from "../Contexts/LoadingContext";
import { days } from "../infos/dates";
import type { WeatherResponse } from "../types";
import { getIcon } from "../infos/weatherCodes";
import { Loading } from "./Loading";
import { DataContext } from "../Contexts/DataContext";

const Card = ({
  day,
  max,
  min,
  weatherCode,
}: {
  day: string | undefined;
  min: number | undefined;
  max: number | undefined;
  weatherCode: number | undefined;
}) => {
  const { loadingWeather } = useContext(LoadingContext);
  const { data } = useContext(DataContext);

  let Content : JSX.Element = <> </>;

  if (
    (
      day &&
      !isNaN(min as number) &&
      !isNaN(max as number) &&
      !isNaN(weatherCode as number)
    )
  ) {

    if (!data) return

     Content = (
      <div className="content">
        <img src={(getIcon(weatherCode as number) as {[key: number]: string})[data.current_weather.is_day] as string} alt="Weather Icon" />
        <div className="temperatures">
          <p>{Math.round(min as number)}°</p>
          <p>{Math.round(max as number)}°</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card animated">
      <h3>{day}</h3>
      {loadingWeather &&
      !(
        day &&
        !isNaN(min as number) &&
        !isNaN(max as number) &&
        !isNaN(weatherCode as number)
      ) ? (
        <Loading />
      ) : (
        Content
      )}
    </div>
  );
};

export const DailyForecast = () => {

  const { data } = useContext(DataContext);

  const createCards: (data: WeatherResponse | undefined) => JSX.Element[] = (
    data: WeatherResponse | undefined
  ) => {
    const cards: JSX.Element[] = [];

    if (data) {
      for (let index = 0; index < 7; index++) {
        const time = data?.daily?.time?.[index];
        const day = days?.[new Date(time).getDay()].slice(0, 3);
        const min = data?.daily?.temperature_2m_min?.[index];
        const max = data?.daily?.temperature_2m_max?.[index];
        const weatherCode = data?.daily?.weather_code?.[index];

        cards.push(
          <Card
            key={index}
            day={day}
            min={min}
            max={max}
            weatherCode={weatherCode}
          />
        );
      }
    } else {
      for (let index = 0; index < 7; index++) {
        cards.push(
          <Card
            key={index}
            day={days?.[index].slice(0, 3)}
            min={undefined}
            max={undefined}
            weatherCode={undefined}
          />
        );
      }
    }

    return cards;
  };

  return (
    <div className="dailyForecast">
      <h1>daily forecast</h1>
      <div className="cards">{createCards(data)}</div>
    </div>
  );
};
