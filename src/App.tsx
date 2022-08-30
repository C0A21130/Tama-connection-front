import * as React from "react";
import {Routes, Route} from "react-router-dom";

import Home from "./Routes/Home";
import Library from "./Routes/Library";
import Post from "./Routes/Post";
import Header from "./components/Header";
import TabMenu from "./components/TabMenu";
import Page from "./pages/Page";
import PostPage from "./pages/PostPage";
import CheckPoint from "./pages/GetMedal";

const App: React.FC = () =>{
    return(
        <div className="app">
            <Header />
            <TabMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gaid">
                    <Route path=":pageId" element={<Page />} />
                </Route>
                <Route path="/library" element={<Library />}>
                    <Route path="get" element={<CheckPoint />}/>
                </Route>
                <Route path="/post" element={<Post />}>
                    <Route path="page" element={<PostPage />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App;