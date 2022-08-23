import * as React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import Header from "./components/Header";
import TabMenu from "./components/TabMenu";

const App: React.FC = () =>{
    return(
        <div className="app">
            <Header />
            <TabMenu />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

export default App;