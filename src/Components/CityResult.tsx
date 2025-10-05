import { useEffect, useState } from "react";
import { Star } from "../infos/svg";
import type { City, Favorites, GeocodingResult } from "../types";

export const CityResult = ({
  city,
  setCityCoords,
  setFavorites,
  favorites,
}: {
  city: GeocodingResult;
  setCityCoords: React.Dispatch<
    React.SetStateAction<City>
  >;
  setFavorites: React.Dispatch<React.SetStateAction<Favorites>>;
  favorites: Favorites;
}) => {
  const [favoriteBool, setFavoriteBool] = useState<boolean>(false);

  const manageFavorite = (event : React.MouseEvent) => {
    if (
      !favorites.some(
        (fav) =>
          fav.name === city.name &&
          fav.latitude === city.latitude &&
          fav.longitude === city.longitude
      )
    ) {
      setFavorites((prev) => [
        ...prev,
        { ...city, name: city.name, lat: city.latitude, long: city.longitude },
      ]);
    }

    else {
      setFavorites((prev) =>
        prev.filter(
          (fav) =>
            !(
              fav.name === city.name &&
              fav.latitude === city.latitude &&
              fav.longitude === city.longitude
            )
        )
      );
    }

    event.stopPropagation();
  };

  useEffect(() => {
    setFavoriteBool(
      favorites.find(
        (fav) =>
          fav.name === city.name &&
          fav.latitude === city.latitude &&
          fav.longitude === city.longitude
      )
        ? true
        : false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  return (
    <div
      className="res animated"
      onClick={() => {
        setCityCoords({
          long: city.longitude,
          lat: city.latitude,
          name : `${city.name}, ${city.country}`
        });
      }}
    >
      <p className={favoriteBool ? "favorite" : ""}>{city.name}</p>
      <Star onClick={manageFavorite} />
    </div>
  );
};
