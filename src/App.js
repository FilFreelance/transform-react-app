import logo from "./undergroundLogo.png"
import "./App.css"
import React, { Component } from "react"
import TrainList from "./component/TrainList"

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="station-text">
                        <p>Great Portland Street Tube Station</p>
                        <p>Please see incoming trains below </p>
                    </div>

                    <TrainList />
                </header>
            </div>
        )
    }
}
export default App
