import {  useEffect, useState } from "react";
import type { GeocodingResponse, City } from "../types";



export const useCities = (setError : React.Dispatch<React.SetStateAction<boolean>>) => {

    const [cities, setCities] = useState<GeocodingResponse | undefined>(undefined);
    const [city, setCity] = useState<City>({} as City);

    useEffect(() => {
        setError(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [city]);

    return { cities, setCities, city, setCity };
    
}