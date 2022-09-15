import * as React from "react";
import axios from "axios";
import { constant } from "./../constant";

import PageEntry from "./../components/PageEntry";

import Sightseeing from "./../static/images/tag_menu/sightseeing.svg";
import Gourmet from "./../static/images/tag_menu/gourmet.svg";
import Walking from "./../static/images/tag_menu/walking.svg";
import Souvenir from "./../static/images/tag_menu/souvenir.svg";
 
import "./../static/css/home.scss";

const ROOT_URL = constant.ROOT_URL;

interface PageData {
    file_name: number,
    title: string,
    tag: string,
    text: string,
    user: number,
    location: {
        x: number,
        y: number
    }
    image: string
}

interface ResponsePageData {
    kankou: PageData[],
    gurume: PageData[],
    tamasanpo: PageData[],
    omiyage: PageData[]
}

type Tag = "kankou" | "gurume" | "tamasanpo" | "omiyage";

// 記事の配列から2つの画像を取り出す
const makeRandomPage = (pages:PageData[]):string[] => {
    const rand1:number = Math.floor(Math.random() * pages.length);
    while(true) {
        const rand2:number = Math.floor(Math.random() * pages.length);
        // 返却値が被らないように変更
        if ((rand1 != rand2) || (pages.length === 1)) {
            return [pages[rand1].image, pages[rand2].image];
        }
    }
}

const Home: React.FC = ()=>{
    const [tag, setTag] = React.useState<Tag>("kankou");
    const [displayPage, setDisplayPage] = React.useState<PageData[]>();
    const [pageData, setPageData] = React.useState<ResponsePageData>();
    const [picBox, setPicBox] = React.useState<string[]>(["", ""]);

    React.useEffect(() => {
        const getPage = async () => {
            axios.get<ResponsePageData>(`${ROOT_URL}/page`)
            .then((response) => {
                setPageData(response.data);
                setDisplayPage(response.data.kankou);
                setPicBox(makeRandomPage(response.data.kankou));
            })
            .catch(() => {
                setDisplayPage([])
            })
        }
        getPage();
    }, [])

    // タグメニューのボタンを押したときにタグを切り替える
    const changeTag = (t: Tag) => {
        setTag(t)
        switch (t) {
            case "kankou":
                setDisplayPage(pageData.kankou);
                setPicBox(makeRandomPage(pageData.kankou))
                break;
            case "gurume":
                setDisplayPage(pageData.gurume);
                setPicBox(makeRandomPage(pageData.gurume))
                break;
            case "tamasanpo":
                setDisplayPage(pageData.tamasanpo);
                setPicBox(makeRandomPage(pageData.tamasanpo))
                break;
            case "omiyage":
                setDisplayPage(pageData.omiyage);
                setPicBox(makeRandomPage(pageData.omiyage))
                break;
        }
    }

    return(
        <div className="home">
            <div className="tag-menu-block">
                <ul>
                    <li onClick={() => changeTag("kankou")} className={tag == "kankou" ? "active" : "noactive"}><div className="icon"><Sightseeing /></div><p>観光地</p></li>
                    <li onClick={() => changeTag("gurume")} className={tag == "gurume" ? "active" : "noactive"}><div className="icon"><Gourmet /></div><p>グルメ</p></li>
                    <li onClick={() => changeTag("tamasanpo")} className={tag == "tamasanpo" ? "active" : "noactive"}><div className="icon"><Walking /></div><p>たまさんぽ</p></li>
                    <li onClick={() => changeTag("omiyage")} className={tag == "omiyage" ? "active" : "noactive"}><div className="icon"><Souvenir /></div><p>お土産</p></li>
                </ul>
            </div>
            <div className="pictures-blck">
                <ul>
                    <li><img alt="" src={picBox[0]}></img></li>
                    <li><img alt="" src={picBox[1]}></img></li>
                </ul>
            </div>
            <div className="pages-block">
                {displayPage?.map((page, index) =>
                    <PageEntry page={page.file_name} title={page.title} text={page.text} image={page.image} key={index} />
                )}
            </div>
        </div>
    )
}

export default Home