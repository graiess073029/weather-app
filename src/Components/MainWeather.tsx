import { days, months } from "../infos/dates";
import { Loading } from "../Components/Loading";
import { getIcon } from "../infos/weatherCodes";
import { useContext } from "react";
import { LoadingContext } from "../Contexts/LoadingContext";
import { DataContext } from "../Contexts/DataContext";

export const MainWeather = ({ city }: { city: string | undefined }) => {

  const { data } = useContext(DataContext);
  const { loadingWeather } = useContext(LoadingContext);

  const temperature = data?.current_weather?.temperature;
  const weatherCode = data?.current_weather?.weathercode;
  const date = new Date(data?.current_weather?.time as string);
  const showedDate = `${days?.[date.getDay()]}, ${months?.[date.getMonth()]?.slice(
    0,
    3
  )} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <div className={`main-weather`}>
      {loadingWeather || !data ? (
        <>
          <Loading siblings={<p>Loading ...</p>} />
        </>
      ) : (
        <div className="info">
          <div className="timeSpace">
            <h2>{city}</h2>
            <p>{showedDate}</p>
          </div>
          <div className="weather">
            <img src={(getIcon(weatherCode as number) as {[key: number]: string})?.[data.current_weather.is_day] as string} alt="Weather Icon" />
            <p>{Math.round(temperature as number)}°</p>
          </div>
        </div>
      )}
    </div>
  );
};
