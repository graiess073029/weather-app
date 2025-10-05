import { useContext } from "react";
import { LoadingContext } from "../Contexts/LoadingContext";

export const Loading = ({siblings} : {siblings? : JSX.Element | JSX.Element[]}) => {
    
    const { loadingWeather } = useContext(LoadingContext);

  return (
    <div className="loading" style={{ display: loadingWeather ? "flex" : "none" }}>
      <div className="points">
        <div className="point first"></div>
        <div className="point middle"></div>
        <div className="point last"></div>
      </div>
      {siblings}
    </div>
  );
};
