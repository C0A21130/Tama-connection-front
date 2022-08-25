import * as React from "react";
import {Routes, Route} from "react-router-dom";

import Home from "./Home";
import Header from "./components/Header";
import TabMenu from "./components/TabMenu";
import Page from "./pages/Page";

const App: React.FC = () =>{
    return(
        <div className="app">
            <Header />
            <TabMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/page">
                    <Route path=":pageId" element={<Page />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App;