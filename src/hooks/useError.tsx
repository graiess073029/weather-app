import { useState } from "react";


export const useError = () => {
    const [error, setError] = useState<boolean>(false);


    const throwError = (err : Error) => {
        console.error(err); 
        setError(true);
    }

    return { error, throwError,setError };
}