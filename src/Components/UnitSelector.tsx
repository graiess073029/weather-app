import type React from "react"
import { CheckMark } from "../infos/svg"


export const UnitSelector = <T extends string>({content,newVal,state,setState} : {content : string, newVal : T,state : T,setState : React.Dispatch<React.SetStateAction<T>>}) => {

    const clickHandler = () => {
        setState(newVal)
    }

    return(
        <button onClick={clickHandler} className={`unitSelector animated ${state === newVal ? "selected" : ""}`}>
            <p>{content}</p>
            <CheckMark display={state === newVal} />
        </button>
    )


}