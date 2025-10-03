import { useState, useEffect } from "react";
import type { Favorites } from "../types";

export const useFavorties = () => {
  const [favorites, setFavorites] = useState<Favorites>([]);

  useEffect(() => {
    if(favorites.length) window.localStorage.setItem("favorites", JSON.stringify(favorites)); 
  }, [favorites]);

    return {favorites, setFavorites};

};
