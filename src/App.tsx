import * as React from "react";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import checkAccount from "./lib/checkAccount";

import Header from "./components/Header";
import TabMenu from "./components/TabMenu";
import Footer from "./components/Footer";

import Home from "./Routes/Home";
import Map from "./Routes/Map";
import Camera from "./Routes/Camera";
import Post from "./Routes/Post";
import Account from "./Routes/Account";
import Eroor from "./Routes/Eroor";

import Gaid from "./pages/Gaid";
import PostPage from "./pages/PostPage";
import CheckPage from "./pages/CheckPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Success from "./pages/Success";

const App: React.FC = () =>{
    const loc = useLocation();
    
    React.useEffect(()=>{
        // azureの場合リダイレクトするように変更
        if (location.hostname == "lemon-bush-0663dd310.1.azurestaticapps.net" || location.hostname == "tk2-123-61896.vs.sakura.ne.jp") {
            location.href = "https://tama-connect.com";
        }
    }, [loc])
    
    return(
        <div className="app">
            <div className="main-header">
                <Header />
                <TabMenu />
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gaid">
                    <Route path=":pageId" element={<Gaid />} />
                </Route>
                <Route path="/map" element={<Map />} />
                <Route path="/camera" element={<Camera />} />
                <Route path="/post" element={checkAccount() ?<Post />:<Navigate to="/account/signup"/>}>
                    <Route path="page" element={<PostPage />} />
                    <Route path="check" element={<CheckPage />} />
                </Route>
                <Route path="/account" element={<Account />}>
                    <Route path="signup" element={<Signup />} />
                    <Route path="login" element={<Login />} />
                    <Route path="success" element={<Success />} />
                </Route>
                <Route path="*" element={<Eroor />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App;