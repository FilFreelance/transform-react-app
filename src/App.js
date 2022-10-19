import logo from "./logo.svg"
import "./App.css"
import * as TflApi from "./api/TflApi"
import React, { useEffect } from "react"

function App() {
    useEffect(() => {
        TflApi.getGreatPortlandStreetArrivals().then((station) => {
            TflApi.formatTrainList(station)
        })
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Basic TFL test app</p>
            </header>
        </div>
    )
}

export default App
