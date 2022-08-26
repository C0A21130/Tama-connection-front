import * as React from "react";
import {Routes, Route} from "react-router-dom";
import axios from "axios";

import Home from "./Home";
import Library from "./Library";
import Header from "./components/Header";
import TabMenu from "./components/TabMenu";
import Page from "./pages/Page";

// const ROOT_URL: string = "https://tama-connection-backend.herokuapp.com";
const ROOT_URL: string = "http://localhost:5000";

interface Other {
    user: string,
    location: {
        x: number,
        y: number
    },
    good: number
}

interface PageData {
    file_name: number,
    title: string,
    tag: string,
    text: string,
    other: Other | null
}

interface ResponsePageData {
    kankou: PageData[],
    gurume: PageData[],
    tamasanpo: PageData[],
    omiyage: PageData[]
}

const App: React.FC = () =>{
    let responsData: ResponsePageData;

    // 
    React.useEffect(()=>{
        const getData = async ()=>{
            await axios.get<ResponsePageData>(ROOT_URL + "/page")
            .then((response)=>{
                const {data} = response;
                responsData = data;
            }) 
        }
        getData();
    }, [])

    return(
        <div className="app">
            <Header />
            <TabMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/page">
                    <Route path=":pageId" element={<Page />} />
                </Route>
                <Route path="/library" element={<Library />}></Route>
            </Routes>
        </div>
    )
}

export default App;