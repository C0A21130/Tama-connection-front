import * as React from "react";
import PageEntry from "../components/PageEntry";

import Sightseeing from "./../../static/images/tag_menu/sightseeing.svg";
import Gourmet from "./../../static/images/tag_menu/gourmet.svg";
import Walking from "./../../static/images/tag_menu/walking.svg";
import Souvenir from "./../../static/images/tag_menu/souvenir.svg";
 
import "./../../static/css/home.scss";
import axios from "axios";

const pic_datas = require("./../pic.json");

const ROOT_URL = "http://localhost:5000";
// const ROOT_URL = "https://tama-connection-backend.herokuapp.com";

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
    other: Other | null,
    image: string
}

interface ResponsePageData {
    kankou: PageData[],
    gurume: PageData[],
    tamasanpo: PageData[],
    omiyage: PageData[]
}

type Tag = "kankou" | "gurume" | "tamasanpo" | "omiyage";

const Home: React.FC = ()=>{

    const [tag, setTag] = React.useState<Tag>("kankou");
    const [displayPage, setDisplayPage] = React.useState<PageData[]>();
    const [pageData, setPageData] = React.useState<ResponsePageData>();

    React.useEffect(() => {
        const getPage = async () => {
            const {data} = await axios.get<ResponsePageData>(ROOT_URL + "/page")
            setPageData(data)
            setDisplayPage(data.kankou);
        }
        getPage();
    }, [])

    // タグメニューのボタンを押したときにタグを切り替える
    const changeTag = (t: Tag) => {
        setTag(t)
        switch (t) {
            case "kankou":
                setDisplayPage(pageData.kankou);
                break;
            case "gurume":
                setDisplayPage(pageData.gurume);
                break;
            case "tamasanpo":
                setDisplayPage(pageData.tamasanpo);
                break;
            case "omiyage":
                setDisplayPage(pageData.omiyage);
                break;
        }
    }

    const pages: JSX.Element[] = displayPage?.map((page, index) => 
        <PageEntry page={page.file_name} title={page.title} text={page.text} image={page.image} key={index}/>
    )

    return(
        <div className="home">
            <div className="tag-menu-block">
                <ul>
                    <li onClick={() => changeTag("kankou")} className={tag == "kankou" ? "active" : "noactive"}><div id="sightseeing"><Sightseeing /></div><p>観光地</p></li>
                    <li onClick={() => changeTag("gurume")} className={tag == "gurume" ? "active" : "noactive"}><div id="gourumet"><Gourmet /></div><p>グルメ</p></li>
                    <li onClick={() => changeTag("tamasanpo")} className={tag == "tamasanpo" ? "active" : "noactive"}><div id="walking"><Walking /></div><p>たまさんぽ</p></li>
                    <li onClick={() => changeTag("omiyage")} className={tag == "omiyage" ? "active" : "noactive"}><div id="omiyage"><Souvenir  /></div><p>お土産</p></li>
                </ul>
            </div>
            <div className="pictures-blck">
                <ul>
                    <li><img src={pic_datas.file1}></img></li>
                    <li><img src={pic_datas.file2}></img></li>
                </ul>
            </div>
            <div className="pages-block">
                {pages}
            </div>
        </div>
    )
}

export default Home