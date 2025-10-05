import { createContext } from "react";

interface Loading {
  loadingWeather : boolean;
  setLoadingWeather : React.Dispatch<React.SetStateAction<boolean>>;
  loadingCities : boolean;
  setLoadingCities : React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<Loading>({} as Loading);
