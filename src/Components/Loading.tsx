import { useContext } from "react";
import { LoadingContext } from "../Contexts/LoadingContext";

export const Loading = () => {
    
    const { loadingWeather } = useContext(LoadingContext);

  return (
    <div className="loading" style={{ display: loadingWeather ? "flex" : "none" }}>
      <div className="points">
        <div className="point first"></div>
        <div className="point middle"></div>
        <div className="point last"></div>
      </div>
    </div>
  );
};
