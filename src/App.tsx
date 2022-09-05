import * as React from "react";
import {Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import TabMenu from "./components/TabMenu";

import Home from "./Routes/Home";
import Map from "./Routes/Map";
import Library from "./Routes/Library";
import Post from "./Routes/Post";
import Account from "./Routes/Account";

import GetPage from "./pages/GetPage";
import GetMedal from "./pages/GetMedal";
import CheckMedal from "./pages/CheckMedal";
import PostPage from "./pages/PostPage";
import CheckPage from "./pages/CheckPage";

const App: React.FC = () =>{
    return(
        <div className="app">
            <Header />
            <TabMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gaid">
                    <Route path=":pageId" element={<GetPage />} />
                </Route>
                <Route path="/map" element={<Map />} />
                <Route path="/library" element={<Library />}>
                    <Route path="get" element={<GetMedal />}/>
                    <Route path="check" element={<CheckMedal />} />
                </Route>
                <Route path="/post" element={<Post />}>
                    <Route path="page" element={<PostPage />} />
                    <Route path="check" element={<CheckPage />} />
                </Route>
                <Route path="/account" element={<Account />}>
                    <Route path="signup" />
                    <Route path="login" />
                </Route>
            </Routes>
        </div>
    )
}

export default App;