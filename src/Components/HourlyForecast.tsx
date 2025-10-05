import { useContext, useEffect, useState, type JSX } from "react";
import type { WeatherResponse } from "../types";
import { getIcon } from "../infos/weatherCodes";
import { DropDown } from "../infos/svg";
import { days } from "../infos/dates";
import { Loading } from "./Loading";
import { LoadingContext } from "../Contexts/LoadingContext";
import { DataContext } from "../Contexts/DataContext";
import sunRiseAndSet from "/images/icon-sunrise.webp";

const loops = 24 * 7;

const Card = ({
  hour,
  temperature,
  weatherCode,
}: {
  hour: string | undefined;
  temperature: number | undefined;
  weatherCode: number | undefined;
}) => {

  const { loadingWeather } = useContext(LoadingContext);

  const { data } = useContext(DataContext);

  let Content: JSX.Element = <> </>;

  if (hour && !isNaN(temperature as number) && !isNaN(weatherCode as number)) {
    if (!data) return;
    Content = (
      <div className="content">
        <div className="left">
          <img
            src={
              (getIcon(weatherCode as number) as { [key: number]: string })[
                data.current_weather.is_day
              ] as string
            }
            alt="Weather Icon"
          />
          <p>{hour}</p>
        </div>
        <p>{temperature}°</p>
      </div>
    );
  }

  return (
    <div className="card">
      {loadingWeather &&
      !(
        hour &&
        !isNaN(temperature as number) &&
        !isNaN(weatherCode as number)
      ) ? (
        <Loading />
      ) : (
        Content
      )}
    </div>
  );
};

const SunCard = ({
  riseOrShine,
  date,
}: {
  riseOrShine: string | undefined;
  date: string | undefined;
}) => {

  let hours = new Date(date || "").getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  if (hours == 12) hours = 0;
  const hour = (hours < 10 ? "0" : "") + hours + " " + ampm;

  const { loadingWeather } = useContext(LoadingContext);

  const { data } = useContext(DataContext);

  let Content: JSX.Element = <> </>;

  if (riseOrShine && hour) {
    if (!data) return;
    Content = (
      <div className="content">
        <div className="left">
          <img src={sunRiseAndSet} alt="Weather Icon" />
          <p>{hour}</p>
        </div>
        <p>{riseOrShine}</p>
      </div>
    );
  }

  return (
    <div className="card">
      {loadingWeather && !(riseOrShine && hour) ? <Loading /> : Content}
    </div>
  );
};

export const HourlyForecast = ({
  dropDown,
  setDropDown,
}: {
  dropDown: boolean;
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data } = useContext(DataContext);

  const [day, setDay] = useState<number>(new Date().getDay());
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (dropDown) {
      setDisplay(true);
      return;
    }

    setTimeout(() => {
      setDisplay(dropDown);
    }, 560);
  }, [dropDown]);

  const createCards: (data: WeatherResponse | undefined) => JSX.Element[] = (
    data: WeatherResponse | undefined
  ) => {
    const cards: JSX.Element[] = [];

    const SunRise: JSX.Element = (
      <SunCard key={"sunrise"} riseOrShine={"Sunrise"} date={(data?.daily?.sunrise || [])[0]} />
    );
    const SunSet: JSX.Element = (
      <SunCard  key={"sunset"} riseOrShine={"Sunset"} date={(data?.daily?.sunset || [])[0]} />
    );

    if (data) {
      for (let index = 0; index < loops; index++) {
        const time = data?.hourly?.time?.[index];
        const dayNumber = new Date(time).getDay();
        if (dayNumber === day) {
          let hours = new Date(time).getHours();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;
          if (hours == 12) hours = 0;
          const hour = (hours < 10 ? "0" : "") + hours + " " + ampm;
          const temperature = data?.hourly?.temperature_2m?.[index];
          const weatherCode = data?.hourly?.weather_code?.[index];

          // Verify if the suncard has the same date

          const sunrise = data?.daily?.sunrise?.filter(
            (e) => e.split("T")?.[0] === time.split("T")?.[0]
          )?.[0];
          const sunset = data?.daily?.sunset?.filter(
            (e) => e.split("T")?.[0] === time.split("T")?.[0]
          )?.[0];

          const condition1 =
            time &&
            sunrise &&
            new Date(time).getHours() === new Date(sunrise).getHours();
          const condition2 =
            time &&
            sunset &&
            new Date(time).getHours() === new Date(sunset).getHours();

          if (condition1) cards.push(SunRise);
          if (condition2) cards.push(SunSet);

          cards.push(
            <Card
              key={index}
              hour={hour}
              temperature={temperature}
              weatherCode={weatherCode}
            />
          );
        }
      }
    } else {
      for (let index = 0; index < 24; index++) {
        cards.push(
          <Card
            key={index}
            hour={undefined}
            temperature={undefined}
            weatherCode={undefined}
          />
        );
      }
    }

    return cards;
  };

  const changeDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    setDropDown((prev: boolean) => !prev);
  };

  return (
    <div className="hourly">
      <header>
        <h1>hourly forecast</h1>
        <button onClick={changeDropdown} className="day">
          <p>{days?.[day]}</p>
          <DropDown />
        </button>
        <div
          style={{ display: display ? "flex" : "none" }}
          className={`dropDown${dropDown ? "" : " fadeout"}`}
        >
          <button
            className={day === 1 ? "selected animated" : "animated"}
            onClick={() => setDay(1)}
          >
            monday
          </button>
          <button
            className={day === 2 ? "selected animated" : "animated"}
            onClick={() => setDay(2)}
          >
            tuesday
          </button>
          <button
            className={day === 3 ? "selected animated" : "animated"}
            onClick={() => setDay(3)}
          >
            wednesday
          </button>
          <button
            className={day === 4 ? "selected animated" : "animated"}
            onClick={() => setDay(4)}
          >
            thursday
          </button>
          <button
            className={day === 5 ? "selected animated" : "animated"}
            onClick={() => setDay(5)}
          >
            friday
          </button>
          <button
            className={day === 6 ? "selected animated" : "animated"}
            onClick={() => setDay(6)}
          >
            saturday
          </button>
          <button
            className={day === 0 ? "selected animated" : "animated"}
            onClick={() => setDay(0)}
          >
            sunday
          </button>
        </div>
      </header>
      <div className="cards">{createCards(data)}</div>
    </div>
  );
};
