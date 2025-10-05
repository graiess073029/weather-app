import { useContext, useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { Loading, Search, Location } from "./infos/svg";
import { ErrorHappened } from "./Components/Error";
import {
  type Favorites,
  type GeocodingResponse,
  type ReverseGeocodingResponse,
} from "./types";
import { CityResult } from "./Components/CityResult";
import { MainWeather } from "./Components/MainWeather";
import { Card, UvCard } from "./Components/Card";
import { DailyForecast } from "./Components/DailyForecast";
import { HourlyForecast } from "./Components/HourlyForecast";
import { LoadingContext } from "./Contexts/LoadingContext";
import { ThemeContext } from "./Contexts/ThemeContext";
import { useError } from "./hooks/useError";
import { useWeatherData } from "./hooks/useWeatherData";
import { useCities } from "./hooks/useCities";
import { useFavorties } from "./hooks/useFavorties";

// To add : uv-index, visibility, air pression, dewpoint

export const App = () => {
  const { loadingCities, setLoadingCities } = useContext(LoadingContext);
  const { theme } = useContext(ThemeContext);

  const [daysDropDown, setDaysDropDown] = useState<boolean>(false);
  const [settingsDropDown, setSettingsDropDown] = useState<boolean>(false);

  const { error, throwError, setError } = useError();
  const { cities, setCities, city, setCity } = useCities(setError);
  const { weatherCardsData } = useWeatherData(city, setCities, throwError);
  const { favorites, setFavorites } = useFavorties();

  const [place, setPlace] = useState("");

  const [resultsDisplay, setResultsDisplay] = useState<boolean>(false);

  const resultContent = () => {
    if (loadingCities)
      return (
        <div className="progress">
          <Loading /> <p className="loading">Search In Progress</p>
        </div>
      );
    else if (cities?.results?.length)
      return cities?.results?.map((res) => (
        <CityResult
          key={res.id}
          city={res}
          setCityCoords={setCity}
          setFavorites={setFavorites}
          favorites={favorites}
        />
      ));
    else if (favorites.length > 0 && !cities?.results?.length)
      return favorites.map((fav) => (
        <CityResult
          key={fav.id}
          city={fav}
          setCityCoords={setCity}
          setFavorites={setFavorites}
          favorites={favorites}
        />
      ));
    else if (!navigator.onLine) return <p>You are offline !</p>;
    else return <p>No results or favorites found !</p>;
  };

  const getCurrentPos = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const body: ReverseGeocodingResponse = await response.json();

          setCity({
            lat: latitude,
            long: longitude,
            name: `${body?.address?.city || body?.address?.state}, ${
              body?.address?.country
            }`,
          });
        } catch (err) {
          throwError(err as Error);
        }
      },
      () => {
        setCity({ lat: 52.52, long: 13.41, name: "Berlin, Germany" });
      }
    );
  };

  useEffect(() => {
    try {
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
    } finally {
      getCurrentPos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      } catch (err) {
        throwError(err as Error);
      }
    }
  };

  document.onclick = (event: MouseEvent) => {
    if (
      !(event.target as HTMLElement)?.closest(
        "#root > div > section.search > div > div.search"
      )
    ) {
      setResultsDisplay(false);
    }
  };

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
              <button
                disabled={place.length === 0 || !navigator.onLine}
                className="animated"
                onClick={searchHandler}
              >
                Search
              </button>
              <button className="location animated" onClick={(event : React.MouseEvent<HTMLButtonElement>) => {
               ( event.target as HTMLButtonElement).blur();
                getCurrentPos();
              }}>
                <Location />
                <p>Current location</p>
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
            <MainWeather city={city.name} />
            <div className="cards">
              <Card
                title="feels like"
                value={weatherCardsData.apparent_temperature}
              />
              <Card title="humidity" value={weatherCardsData.humidity} />
              <Card title="wind" value={weatherCardsData.wind} />
              <Card
                title="precipitation"
                value={weatherCardsData.precipitation}
              />
            </div>
            <div className="cards">
              <UvCard title="Uv Index" value={weatherCardsData.uvIndex} />
              <Card title="Visibility" value={weatherCardsData.visibility} />
              <Card title="Pressure" value={weatherCardsData.pressure} />
              <Card
                title="Precipitation %"
                value={weatherCardsData.precipitationProbability}
              />
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
