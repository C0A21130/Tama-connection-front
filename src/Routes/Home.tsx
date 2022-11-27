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
const PER_PAGE = 3;

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

interface Max {
    "kankou" : number,
    "gurume" : number,
    "tamasanpo" : number,
    "omiyage" : number
}

// axiosで受け取るデータの型
interface ResponsePageData {
    result: PageData[],
    max : Max
}

// 記事の配列から2つの画像を取り出す
const makeRandomPage = (pages:PageData[][]) :string[] => {
    let result: string[] = [];
    // 保存されているデータから２個ランダムで画像を取り出して配列に追加する
    for (let i=0; i<2; i++) {
        const rand1: number = Math.floor(Math.random() * pages.length);
        const rand2: number = Math.floor(Math.random() * pages[rand1].length);
        result.push(pages[rand1][rand2].image)
    }
    return result
}

// タグとページ番号の初期設定
const init: State = {
    tag: "kankou",
    pageNum: 0
}

const Home: React.FC = () => {
    // タグごとのページ情報を管理する変数
    const [kankouData, setKankouData] = React.useState<PageData[][]>([]);
    const [gurumeData, setGurumeData] = React.useState<PageData[][]>([]);
    const [tamasanpoData, setTamasanpoData] = React.useState<PageData[][]>([]);
    const [omiyageData, setOmiyageData] = React.useState<PageData[][]>([]);

    // 表示するページと写真ボックスの変数
    const [displayPage, setDisplayPage] = React.useState<PageData[]>();
    const [maxPageNums, setMaxPageNum] = React.useState<Max>({"kankou":0, "gurume":0, "tamasanpo":0, "omiyage":0});
    const [picBox, setPicBox] = React.useState<string[]>(["", ""]);

    // 表示するページを変える関数
    const changePage = (action:State, pages: PageData[][], setPages: React.Dispatch<React.SetStateAction<PageData[][]>>)=> {
        // ページが保存されている場合にはそのまま利用する
        try {
            // 投稿ページが配列に保存されていなければ例外処理へジャンプする
            if (pages[action.pageNum][0] == undefined) {
                throw new Error("undefind");
            }
            setDisplayPage(pages[action.pageNum]);
            setPicBox(makeRandomPage(pages))
        // ページが配列に保存されていない場合はAPIサーバから投稿ページを取得する
        } catch(e) {
            axios.get<ResponsePageData>(`${ROOT_URL}/pages?tag=${action.tag}&pageNum=${action.pageNum}`)
            .then((response) => {
                setDisplayPage(response.data.result);
                setPages([...pages, response.data.result]);
                setMaxPageNum(response.data.max);
                setPicBox(makeRandomPage([...pages, response.data.result]))
            })
        }
    }

    // タグと番号を同時変更するreducer変数
    const reduser = (state: State, action: State) => {
        // ページの上限に達していないか確認する変数
        let flag: boolean;

        switch(action.tag){
            case "kankou":
                flag = (-1 < action.pageNum) && (Math.ceil(maxPageNums.kankou / PER_PAGE) > action.pageNum);
                // 上限に達していなければページを更新する
                if (flag) {
                    changePage(action, kankouData, setKankouData);
                    return action
                }
                break;
            case "gurume":
                flag = (-1 < action.pageNum) && (Math.ceil(maxPageNums.gurume / PER_PAGE) > action.pageNum);
                // 上限に達していなければページを更新する
                if (flag) {
                    changePage(action, gurumeData, setGurumeData);
                    return action
                }
                break;
            case "tamasanpo":
                flag = (-1 < action.pageNum) && (Math.ceil(maxPageNums.tamasanpo / PER_PAGE) > action.pageNum);
                // 上限に達していなければページを更新する
                if (flag) {
                    changePage(action, tamasanpoData, setTamasanpoData);
                    return action  
                }
                break;
            case "omiyage":
                flag = (-1 < action.pageNum) && (Math.ceil(maxPageNums.omiyage / PER_PAGE) > action.pageNum);
                // 上限に達していなければページを更新する
                if (flag) {
                    changePage(action, omiyageData, setOmiyageData);
                    return action
                }
                break;
            default:
                return state;
        }
        return state
    }
    const [state, dispath] = React.useReducer(reduser, init);  

    React.useEffect(() => {
        changePage(init, kankouData, setKankouData);
    }, [])

    return(
        <div className="home">
            <div className="tag-menu-block">
                <ul>
                    <li onClick={() => dispath({tag: "kankou", pageNum: 0})} className={state.tag == "kankou" ? "active" : "noactive"}><div className="icon"><Sightseeing /></div><p>たまファーム</p></li>
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
            <div className="select-page-block">
                <button onClick={() => { dispath({ tag: state.tag, pageNum: state.pageNum - 1 }) }}>＜</button>
                <p>{state.pageNum + 1}</p>
                <button onClick={() => { dispath({ tag: state.tag, pageNum: state.pageNum + 1 }) }}>＞</button>
            </div>
        </div>
    )
}

export default Home