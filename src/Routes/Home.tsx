import * as React from "react";
import axios from "axios";
import { constant } from "./../constant";
import select from "./../lib/select";
import PageEntry from "./../components/PageEntry";

import Sightseeing from "./../static/images/tag_menu/sightseeing.svg";
import Gourmet from "./../static/images/tag_menu/gourmet.svg";
import Walking from "./../static/images/tag_menu/walking.svg";
import Souvenir from "./../static/images/tag_menu/souvenir.svg";
import Load from "./../static/images/load.webm";
import LoadSub from "./../static/images/load.mp4";
 
import "./../static/css/home.scss";

const PER_PAGE = 3;

// 現在のタグとページの番号を保存する型
interface State {
    tag: Tag,
    pageNum: number
}

interface Max {
    "kankou": number,
    "gurume": number,
    "tamasanpo": number,
    "omiyage": number
}

// axiosで受け取るデータの型
interface ResponseBody {
    result: Page[],
    max : Max
}

// 記事の配列から2つの画像を取り出す
const makeRandomPage = (pages:Page[][]) :string[] => {
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
    const [kankouData, setKankouData] = React.useState<Page[][]>([]);
    const [gurumeData, setGurumeData] = React.useState<Page[][]>([]);
    const [tamasanpoData, setTamasanpoData] = React.useState<Page[][]>([]);
    const [omiyageData, setOmiyageData] = React.useState<Page[][]>([]);

    // 表示するページと写真ボックスの変数
    const [displayPage, setDisplayPage] = React.useState<Page[]>();
    const [maxPageNums, setMaxPageNum] = React.useState<Max>({"kankou":0, "gurume":0, "tamasanpo":0, "omiyage":0});
    const [picBox, setPicBox] = React.useState<string[]>(["", ""]);
    const [load, setLoad] = React.useState<boolean>(true);
    const [neterror, setNeterror] = React.useState<boolean>(false);
    
    // 表示するページを変える関数
    const changePage = (action:State, pages: Page[][], setPages: React.Dispatch<React.SetStateAction<Page[][]>>)=> {
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
            axios.get<ResponseBody>(`${constant.ROOT_URL}/pages?tag=${action.tag}&pageNum=${action.pageNum}`)
            .then((response) => {
                setDisplayPage(response.data.result);
                setPages([...pages, response.data.result]);
                setMaxPageNum(response.data.max);
                setPicBox(makeRandomPage([...pages, response.data.result]));
            })
            .catch(() => {
                setNeterror(true);
            })
            .finally(() => {
                setLoad(false);
            })
        }
    }

    // タグと番号を同時変更するreducer変数
    const reduser = (state: State, action: State) => {
        switch(action.tag){
            // 上限に達していなければページを更新する
            case "kankou":
                if (select(action, kankouData, setKankouData, maxPageNums.kankou, changePage)) {return action}
                break;
            case "gurume":
                if (select(action, gurumeData, setGurumeData, maxPageNums.gurume, changePage)) {return action}
                break;
            case "tamasanpo":
                if (select(action, tamasanpoData, setTamasanpoData, maxPageNums.tamasanpo, changePage)) {return action}
                break;
            case "omiyage":
                if (select(action, omiyageData, setOmiyageData, maxPageNums.omiyage, changePage)) {return action}
                break;
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
            <div className="load" style={{ display: load ? "block" : "none" }}>
                <video playsInline autoPlay muted loop ref={React.useRef<HTMLVideoElement>(null)}>
                    <source src={Load} type="video/webm" />
                    <source src={LoadSub} type="video/mp4" />
                </video>
                <p style={{ display: neterror ? "block" : "none"}}>ネットワークエラー</p>
            </div>
            <div className="pictures-block">
                <ul>
                    <li><img alt="" src={picBox[0]}></img></li>
                    <li><img alt="" src={picBox[1]}></img></li>
                </ul>
            </div>
            <div className="pages-block" style={{display: load ? "none" : "block"}}>
                {displayPage?.map((page, index) =>
                    <PageEntry page={page.page_id} title={page.title} text={page.text} image={page.image} key={index} />
                )}
            </div>
            <div className="select-page-block">
                <button onClick={() => { dispath({ tag: state.tag, pageNum: state.pageNum - 1 }) }}>＜前へ</button>
                <p>{state.pageNum + 1}</p>
                <button onClick={() => { dispath({ tag: state.tag, pageNum: state.pageNum + 1 }) }}>次へ＞</button>
            </div>
        </div>
    )
}

export default Home