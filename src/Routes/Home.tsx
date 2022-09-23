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

// 投稿されたページ情報の型
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

// タグ情報の型
type Tag = "kankou" | "gurume" | "tamasanpo" | "omiyage";

// 現在のタグとページの番号を保存する型
interface State {
    tag: Tag,
    pageNum: number
}

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

// タグとページ番号の初期位置
const init: State = {
    tag: "kankou",
    pageNum: 0
}

const Home: React.FC = () => {
    // タグごとのページ情報を管理する変数
    const [kankouData, setKankouData] = React.useState<PageData[][]>();
    const [gurumeData, setGurumeData] = React.useState<PageData[][]>();
    const [tamasanpoData, setTamasanpoData] = React.useState<PageData[][]>();
    const [omiyageData, setOmiyageData] = React.useState<PageData[][]>();

    // 表示するページと写真ボックスの変数
    const [displayPage, setDisplayPage] = React.useState<PageData[]>();
    const [picBox, setPicBox] = React.useState<string[]>(["", ""]);

    // 表示するページを変える関数
    const changePage = (tag:Tag, pages: PageData[][], setPages: React.Dispatch<React.SetStateAction<PageData[][]>>, pageNum: number)=> {
        // ページが保存されていない場合にAPIサーバから受け取る
        if (pages[pageNum] === undefined) {
            axios.get<PageData[]>(`${ROOT_URL}/page?tag=${tag}`)
            .then((response) => {
                setDisplayPage(response.data);
                setPages([...pages, response.data])
            })
        // ページが保存されている場合にはそのまま利用する
        } else {
            setDisplayPage(pages[pageNum]);
        }
    }

    // タグと番号を同時変更する変数
    const reduser = (state: State, action: State) => {
        switch(action.tag){
            case "kankou":
                changePage(action.tag, kankouData, setKankouData, action.pageNum);
                break;
            case "gurume":
                changePage(action.tag, gurumeData, setGurumeData, action.pageNum);
                break;
            case "tamasanpo":
                changePage(action.tag, tamasanpoData, setTamasanpoData, action.pageNum);
                break;
            case "omiyage":
                changePage(action.tag, omiyageData, setOmiyageData, action.pageNum);
                break;
            default:
                return state;
        }
        return action
    }
    const [state, dispath] = React.useReducer(reduser, init);  

    return(
        <div className="home">
            <div className="tag-menu-block">
                <ul>
                    <li onClick={() => dispath({tag: "kankou", pageNum:0})} className={state.tag == "kankou" ? "active" : "noactive"}><div className="icon"><Sightseeing /></div><p>観光地</p></li>
                    <li onClick={() => dispath({tag: "gurume", pageNum: 0})} className={state.tag == "gurume" ? "active" : "noactive"}><div className="icon"><Gourmet /></div><p>グルメ</p></li>
                    <li onClick={() => dispath({tag: "tamasanpo", pageNum: 0})} className={state.tag == "tamasanpo" ? "active" : "noactive"}><div className="icon"><Walking /></div><p>たまさんぽ</p></li>
                    <li onClick={() => dispath({tag: "omiyage", pageNum: 0})} className={state.tag == "omiyage" ? "active" : "noactive"}><div className="icon"><Souvenir /></div><p>お土産</p></li>
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