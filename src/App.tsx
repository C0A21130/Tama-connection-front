import * as React from "react";
import Home from "./Home";
import Header from "./components/Header";
import TabMenu from "./components/TabMenu";

const App: React.FC = () =>{
    return(
        <div className="app">
            <Header />
            <TabMenu />
            <Home />
        </div>
    )
}

export default App;