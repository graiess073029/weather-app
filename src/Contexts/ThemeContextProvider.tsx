import { useState, type JSX } from "react";
import { ThemeContext } from "./ThemeContext";


export const ThemeContextProvider = ({ children }: { children: JSX.Element }) => {

const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
