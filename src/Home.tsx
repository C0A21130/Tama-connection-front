import * as React from "react";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import PageEntry from "./components/PageEntry";

import Sightseeing from "./../static/images/tag_menu/sightseeing.svg";
import Gourmet from "./../static/images/tag_menu/gourmet.svg";
import Walking from "./../static/images/tag_menu/walking.svg";
import Souvenir from "./../static/images/tag_menu/souvenir.svg";
 
import "./../static/css/home.scss";

const pic_datas = require("./pic.json");

// const BASE_URL = "https://tama-connection-backend.herokuapp.com";
const BASE_URL = "";

// ページ項目のデータ型を定義
interface PageEntry {
    page: number,
    image: string,
    title: string,
    text: string
}

// 受け取るデータのデータ型を定義
interface ResponsData {
    result: PageEntry[]
}

type Tag = "kankou" | "gurume" | "tamasanpo" | "omiyage";
 
// 仮データ1
const page1: PageEntry = {
    "page" : 1,
    "image": pic_datas.file1,
    "title" : "title1",
    "text" : "text1"
}

// 仮データ2
const page2: PageEntry = {
    "page" : 3,
    "image" : pic_datas.file2,
    "title" : "title2",
    "text" : "text2"
}

const Home: React.FC = ()=>{

    const [tag, setTag] = React.useState<Tag>("kankou")
    const [page_names, setPageNames] = React.useState<PageEntry[]>([]);

    const options: AxiosRequestConfig = {
        url: `${BASE_URL}/page?tag=${tag}`,
        method: "GET"
    }

    // 画面をエンコードしたあととタグを変更した際にページの情報を取得する
    React.useEffect(() => {
        axios(options)
        .then((respons: AxiosResponse<ResponsData>) => {
            const {data} = respons
            setPageNames(data.result)
        })
        .catch((error)=>{
            console.log(error)
            if (tag=="kankou" || tag=="gurume"){
                setPageNames([page1, page2, page2])
            }else{
                setPageNames([page2, page1, page2])
            }
        })

    }, [tag])

    // タグメニューのボタンを押したときにタグを切り替える
    const change_tag = (t: Tag) => {
        setTag(t)
    }

    // ページを保存する配列
    const pages: JSX.Element[] = page_names.map((page: PageEntry, index: number) => 
        <PageEntry page={page.page} image={page.image} title={page.title} text={page.text} key={index} />
    )

    return(
        <div className="home">
            <div className="tag-menu-block">
                <ul>
                    <li onClick={() => change_tag("kankou")} className={tag == "kankou" ? "active" : "noactive"}><div id="sightseeing"><Sightseeing /></div><p>観光地</p></li>
                    <li onClick={() => change_tag("gurume")} className={tag == "gurume" ? "active" : "noactive"}><div id="gourumet"><Gourmet /></div><p>グルメ</p></li>
                    <li onClick={() => change_tag("tamasanpo")} className={tag == "tamasanpo" ? "active" : "noactive"}><div id="walking"><Walking /></div><p>たまさんぽ</p></li>
                    <li onClick={() => change_tag("omiyage")} className={tag == "omiyage" ? "active" : "noactive"}><div id="omiyage"><Souvenir  /></div><p>お土産</p></li>
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