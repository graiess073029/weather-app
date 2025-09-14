import { useContext, useEffect, useState, type JSX } from "react";
import type { WeatherResponse } from "../types";
import { getIcon } from "../weatherCodes";
import { DropDown } from "../svg";
import { days } from "../dates";
import { Loading } from "./Loading";
import { LoadingContext } from "../Contexts/LoadingContext";
import { DataContext } from "../Contexts/DataContext";

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

export const HourlyForecast = () => {
  const { data } = useContext(DataContext);

  const [day, setDay] = useState<number>(new Date().getDay());
  const [dropDown, setDropDown] = useState<boolean>(false);
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

    if (data) {
      for (let index = 0; index < loops; index++) {
        const time = data?.hourly?.time[index];
        const dayNumber = new Date(time).getDay();
        if (dayNumber === day) {
          let hours = new Date(time).getHours();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;
          if (hours == 12) hours = 0;
          const hour = (hours < 10 ? "0" : "") + hours + " " + ampm;
          const temperature = data?.hourly?.temperature_2m[index];
          const weatherCode = data?.hourly?.weather_code[index];

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

  const changeDropdown = (e : React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.blur()
    setDropDown((prev : boolean) => !prev);
  }

  return (
    <div className="hourly">
      <header>
        <h1>hourly forecast</h1>
        <div
          onClick={changeDropdown}
          className="day"
        >
          <p>{days[day]}</p>
          <DropDown />
        </div>
        <div
          style={{ display: display ? "flex" : "none" }}
          className={`dropDown${dropDown ? "" : " fadeout"}`}
        >
          <p
            className={day === 1 ? "selected animated" : "animated"}
            onClick={() => setDay(1)}
          >
            monday
          </p>
          <p
            className={day === 2 ? "selected animated" : "animated"}
            onClick={() => setDay(2)}
          >
            tuesday
          </p>
          <p
            className={day === 3 ? "selected animated" : "animated"}
            onClick={() => setDay(3)}
          >
            wednesday
          </p>
          <p
            className={day === 4 ? "selected animated" : "animated"}
            onClick={() => setDay(4)}
          >
            thursday
          </p>
          <p
            className={day === 5 ? "selected animated" : "animated"}
            onClick={() => setDay(5)}
          >
            friday
          </p>
          <p
            className={day === 6 ? "selected animated" : "animated"}
            onClick={() => setDay(6)}
          >
            saturday
          </p>
          <p
            className={day === 0 ? "selected animated" : "animated"}
            onClick={() => setDay(0)}
          >
            sunday
          </p>
        </div>
      </header>
      <div className="cards">{createCards(data)}</div>
    </div>
  );
};
