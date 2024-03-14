import React from "react";
import load from '../../assets/gif/load.gif'
import './Loading.css'

export default function Loading() {
    return (
        <div className="loadBox">
            <img className="loadImg" src={load} alt='gif loading' />
        </div>
    );
}