import { useContext } from "react";
import { LoadingContext } from "../Contexts/LoadingContext";
import { Loading } from "./Loading";


export const Card = ({title,value} : {title : string,value : string | number | undefined}) => {

    const {loadingWeather}  = useContext(LoadingContext);

    const Content = (
            <div className="content">
                <p className="cardValue">{value ? value : <div className="line"></div>}</p>
            </div>
    )

    return (
        <div className="card animated">
            <h3>{title}</h3>
           { loadingWeather || !value ? <Loading/> : Content}
        </div>
    )
}