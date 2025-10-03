import { Error, Retry } from "../infos/svg"


export const ErrorHappened = ({state} : {state : boolean}) => {

    const retry = () => {window.location.reload()}

    return(
        <div className="error" style={{display: state ? "flex" : "none"}}>
            <Error />
            <h1>Something went wrong</h1>
            <p>We couldn't connect to the server (API | CNX error). Please try again in a few moments.</p>
            <button onClick={retry}>
                <Retry />
                <p>Retry</p>
            </button>
        </div>
    )
}