import type { GeocodingResult } from "../types";

export const CityResult = ({
  city,
  setCityCoords,
  setCityName
}: {
  city: GeocodingResult;
  setCityCoords: React.Dispatch<React.SetStateAction<{long : string, lat : string}>>;
  setCityName: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  return <p className="animated"  onClick={() => {setCityCoords({long : city.longitude.toString(), lat : city.latitude.toString()}); setCityName(`${city.name}, ${city.country}`)}}>{city.name}</p>;
};
