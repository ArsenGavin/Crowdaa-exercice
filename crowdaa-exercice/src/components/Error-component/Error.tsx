import React from "react";
import error from '../../assets/gif/error.gif'
import './Error.css'

export default function Error({text}: {text:string}) {
    return (
        <div className="errorBox">
            <img className="errorImg" src={error} alt='gif error' />
            <p className="errorText">{text}</p>
        </div>
    );
}