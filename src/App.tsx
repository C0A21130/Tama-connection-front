import * as React from "react";
import Home from "./Home"
import Header from "../src/components/Header"
import "../static/css/index.scss"

const App: React.FC = () =>{
    return(
        <div id="app">
            <Header />
            <Home />
        </div>
    )
};

export default App;