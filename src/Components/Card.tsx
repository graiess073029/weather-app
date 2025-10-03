import { useContext } from "react";
import { LoadingContext } from "../Contexts/LoadingContext";
import { Loading } from "./Loading";
import { getUvComment } from "../infos/uvComments";


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

export const UvCard = ({title,value} : {title : string,value : string | undefined}) => {

    const {loadingWeather}  = useContext(LoadingContext);

    const comment = getUvComment(value)

    const Content = (
            <div className="content">
                <p className="cardValue">{value ? value : <div className="line"></div>}</p>
                <p className="comment">{comment ? comment : null}</p>
            </div>
    )

    return (
        <div className="card uv animated">
            <h3>{title}</h3>
           { loadingWeather || !value ? <Loading/> : Content}
        </div>
    )
}