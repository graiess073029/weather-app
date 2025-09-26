import { useState, type JSX } from "react";
import type { WeatherResponse } from "../types";
import { DataContext } from "./DataContext";


export const DataContextProvider = ({ children }: { children: JSX.Element }) => {

const [data, setData] = useState<WeatherResponse | undefined>(undefined);

  return (
    <DataContext.Provider
      value={{
        data,
        setData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
