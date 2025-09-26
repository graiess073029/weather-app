import { useContext, useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { Loading, Search } from "./svg";
import { ErrorHappened } from "./Components/Error";
import {
  type Favorites,
  type GeocodingResponse,
  type ReverseGeocodingResponse,
  type WeatherResponse,
} from "./types";
import { CityResult } from "./Components/CityResult";
import { MainWeather } from "./Components/MainWeather";
import { Card } from "./Components/Card";
import { UnitContext } from "./Contexts/UnitsContext";
import { DailyForecast } from "./Components/DailyForecast";
import { HourlyForecast } from "./Components/HourlyForecast";
import { LoadingContext } from "./Contexts/LoadingContext";
import { DataContext } from "./Contexts/DataContext";
import { ThemeContext } from "./Contexts/ThemeContext";

export const App = () => {
  const { data, setData } = useContext(DataContext);
  const { windSpeedUnit, precipitationUnit, temperatureUnit } =
    useContext(UnitContext);
  const { setLoadingWeather, loadingCities, setLoadingCities } =
    useContext(LoadingContext);
  const { theme } = useContext(ThemeContext);

  const [daysDropDown, setDaysDropDown] = useState<boolean>(false);
  const [settingsDropDown, setSettingsDropDown] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [place, setPlace] = useState("");
  const [cities, setCities] = useState<GeocodingResponse | undefined>(
    undefined
  );
  const [city, setCity] = useState<{ long: number; lat: number }>(
    {} as { long: number; lat: number }
  );
  const [cityName, setCityName] = useState<string | undefined>(undefined);
  const [apparentTemperature, setApparentTemperature] = useState<
    string | undefined
  >(undefined);
  const [humidity, setHumidity] = useState<string | undefined>(undefined);
  const [wind, setWind] = useState<string | undefined>(undefined);
  const [precipitation, setPrecipitation] = useState<string | undefined>(
    undefined
  );
  const [favorites, setFavorites] = useState<Favorites>([]);
  const [resultsDisplay, setResultsDisplay] = useState<boolean>(false);

  const resultContent = () => {

    if (loadingCities)
      return  (
        <div className="progress">
          <Loading /> <p className="loading">Search In Progress</p>
        </div>
      );
    else if (cities?.results?.length)
      return  cities?.results?.map((res) => (
        <CityResult
          key={res.id}
          city={res}
          setCityCoords={setCity}
          setCityName={setCityName}
          setFavorites={setFavorites}
          favorites={favorites}
        />
      ));
    else if (favorites.length > 0 && !cities?.results?.length)
      return  favorites.map((fav) => (
        <CityResult
          key={fav.id}
          city={fav}
          setCityCoords={setCity}
          setCityName={setCityName}
          setFavorites={setFavorites}
          favorites={favorites}
        />
      ));
    else return  <p>No results or favorites found !</p>;
  };

  const getCurrentPos = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setCity({ lat: latitude, long: longitude });

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const body: ReverseGeocodingResponse = await response.json();
          setCityName(
            `${body?.address?.city || body?.address?.state}, ${
              body?.address?.country
            }`
          );
          setCity({ lat: latitude, long: longitude });
        } catch {
          setError(true);
        }
      },
      () => {
        setCityName(`Berlin, Germany`);
        setCity({ lat: 52.52, long: 13.41 });
      }
    );
  };

  useEffect(() => {
    let favorites: string | Favorites =
      window.localStorage.getItem("favorites") || "";

    if (!(favorites.length > 2)) {
      window.localStorage.setItem("favorites", JSON.stringify([]));
    } else {
      try {
        favorites = JSON.parse(favorites) as Favorites;
        if (
          favorites.some(
            (fav) =>
              fav.name?.length === 0 ||
              isNaN(fav.latitude) ||
              isNaN(fav.longitude)
          )
        )
          throw new Error("");
        setFavorites(favorites);
      } catch {
        window.localStorage.setItem("favorites", JSON.stringify([]));
      }
    }

    getCurrentPos();
  }, []);

  useEffect(() => {
    if (data) {
      const date: string = new Date()
        .toISOString()
        .split(":")
        .slice(0, 1)
        .join(":");

      data?.hourly?.time?.forEach((time, index) => {
        if (time.startsWith(date)) {
          setApparentTemperature(
            Math.round(data.hourly.apparent_temperature[index]).toString() + `°`
          );
          setHumidity(
            Math.round(data.hourly.relative_humidity_2m[index]).toString() + `%`
          );
          setWind(
            Math.round(data.hourly.wind_speed_10m[index]).toString() +
              ` ${windSpeedUnit === "kmh" ? "km/h" : windSpeedUnit}`
          );
          setPrecipitation(
            Math.round(data.hourly.precipitation[index]).toString() +
              ` ${precipitationUnit === "inch" ? "in" : precipitationUnit}`
          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setCities(undefined);
  }, [cityName]);

  useEffect(() => {
    (async () => {
      try {
        if (!city || Object.keys(city).length === 0) return;

        setData(undefined);
        setLoadingWeather(true);
        let link = `https://api.open-meteo.com/v1/forecast?current_weather=true&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code`;
        link += "&latitude=" + city.lat + "&longitude=" + city.long;
        link += "&wind_speed_unit=" + windSpeedUnit;
        link += "&precipitation_unit=" + precipitationUnit;
        link += "&temperature_unit=" + temperatureUnit;

        const response = await fetch(link, {
          method: "GET",
          headers: {
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
          },
        });
        const body: WeatherResponse = await response.json();

        setData(body);
        setTimeout(() => {
          setLoadingWeather(false);
        }, 1000);
      } catch {
        setError(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperatureUnit, windSpeedUnit, precipitationUnit, city]);

  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    if (place.length > 0) {
      try {
        setLoadingCities(true);
        setResultsDisplay(true);
        setCities(undefined);
        setPlace("");
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${place}`,
          {
            headers: {
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "none",
            },
          }
        );
        const body: GeocodingResponse = await response.json();
        setCities(body);
        setLoadingCities(false);
      } catch {
        setError(true);
      }
    }
  };

  document.onclick = (event : MouseEvent) => {
    if(!(event.target as HTMLElement)?.closest("#root > div > section.search > div > div.search")){
      setResultsDisplay(false);
    }
  }

  return (
    <>
      <div className={`root_inner ${theme}`}>
        <Header
          dropDown={settingsDropDown}
          setDropDown={setSettingsDropDown}
          error={error}
        />
        <section
          style={{ display: error ? "none" : "flex" }}
          className="search"
        >
          <h1>How's the sky looking today?</h1>
          <div className="input">
            <div className="search">
              <div>
                <input
                  onFocus={() => setResultsDisplay(true)}
                  onChange={(event) => {
                    setPlace(event.target.value);
                  }}
                  value={place}
                  type="text"
                  placeholder="Search for a place..."
                />
                <Search />
              </div>
              <button className="animated" onClick={searchHandler}>
                Search
              </button>
            </div>
            <div
              className="results"
              style={{
                display: resultsDisplay ? "block" : "none",
              }}
            >
              {resultContent()}
            </div>
          </div>
        </section>
        <section
          style={{ display: error ? "none" : "flex" }}
          className="weather"
        >
          <div className="daily">
            <MainWeather city={cityName} />
            <div className="cards">
              <Card title="feels like" value={apparentTemperature} />
              <Card title="humidity" value={humidity} />
              <Card title="wind" value={wind} />
              <Card title="precipitation" value={precipitation} />
            </div>
            <DailyForecast />
          </div>
          <HourlyForecast
            dropDown={daysDropDown}
            setDropDown={setDaysDropDown}
          />
        </section>
        <ErrorHappened state={error} />
      </div>
    </>
  );
};

export default App;
