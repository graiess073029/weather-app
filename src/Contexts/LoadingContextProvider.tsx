import { useState, type JSX } from "react";
import { LoadingContext } from "./LoadingContext";


export const LoadingContextProvider = ({ children }: { children: JSX.Element }) => {

  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);


  return (
    <LoadingContext.Provider
      value={{
        loadingWeather,
        setLoadingWeather,
        loadingCities,
        setLoadingCities
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
