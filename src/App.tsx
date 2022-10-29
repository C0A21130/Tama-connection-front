import * as React from "react";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import checkAccount from "./lib/checkAccount";

import Header from "./components/Header";
import TabMenu from "./components/TabMenu";
import Footer from "./components/Footer";

import Home from "./Routes/Home";
import Map from "./Routes/Map";
import Library from "./Routes/Library";
import Post from "./Routes/Post";
import Account from "./Routes/Account";
import Eroor from "./Routes/Eroor";

import GetPage from "./pages/GetPage";
import GetMedal from "./pages/GetMedal";
import CheckMedal from "./pages/CheckMedal";
import PostPage from "./pages/PostPage";
import CheckPage from "./pages/CheckPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Success from "./pages/Success";

const App: React.FC = () =>{
    const location = useLocation();
    const [isLogin, setIsLogin] = React.useState(false);
    React.useEffect(()=>{
        setIsLogin(checkAccount())
    }, [location])
    
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
                <Route path="/library" element={isLogin?<Library />:<Navigate to="/account/signup" />}>
                    <Route path="get" element={<GetMedal />}/>
                    <Route path="check" element={<CheckMedal />} />
                </Route>
                <Route path="/post" element={isLogin?<Post />:<Navigate to="/account/signup"/>}>
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