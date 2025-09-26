import { createContext } from "react";

interface themeState {
  theme : "light" | "dark", 
  setTheme : React.Dispatch<React.SetStateAction<"light" | "dark">>
}

export const ThemeContext = createContext<themeState>({} as themeState);
