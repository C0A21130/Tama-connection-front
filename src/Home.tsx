import * as React from "react";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import Page from "./components/Page";

import Sightseeing from "./../static/images/tag_menu/sightseeing.svg";
import Gourmet from "./../static/images/tag_menu/gourmet.svg";
import Walking from "./../static/images/tag_menu/walking.svg";
import Souvenir from "./../static/images/tag_menu/souvenir.svg";

import "./../static/css/home.scss";

const ROOT_URL = "https://";
const PICTTUR_NUM = 2;
const PAGE_NUM = 4;

// ページのデータ型を定義
interface Page{
    image: string
    title: string
    text: string
}

type Tag = "kankou" | "gurume" | "tamasanpo" | "omiyage";
 
// 仮データ1
const page1: Page = {
    "image" : "",
    "title" : "title1",
    "text" : "text1"
}

// 仮データ2
const page2: Page = {
    "image" : "",
    "title" : "title2",
    "text" : "text2"
}

const Home: React.FC = ()=>{

    const [tag, setTag] = React.useState<Tag>("kankou")
    const [page_names, setPageNames] = React.useState<Page[]>([]);

    const options: AxiosRequestConfig = {
        url: `${ROOT_URL}/page?tag=${tag}`,
        method: "GET"
    }

    // 画面をエンコードしたあととタグを変更した際にページの情報を取得する
    React.useEffect(() => {
        axios(options)
        .then((respons: AxiosResponse<Page[]>) => {
            const {data} = respons
            setPageNames(data)
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

    return(
        <div className="home">
            <div className="tag-menu-block">
                <ul>
                    <li onClick={() => change_tag("kankou")}><div id="sightseeing"><Sightseeing className={tag == "kankou" ? "active" : false} /></div><p className={tag == "kankou" ? "active" : "noacive"}>観光地</p></li>
                    <li onClick={() => change_tag("gurume")}><div id="gourumet"><Gourmet className={tag == "gurume" ? "active" : false} /></div><p className={tag == "gurume" ? "active" : "noacive"}>グルメ</p></li>
                    <li onClick={() => change_tag("tamasanpo")}><div id="walking"><Walking className={tag == "tamasanpo" ? "active" : false} /></div><p className={tag == "tamasanpo" ? "active" : "noacive"}>たまさんぽ</p></li>
                    <li onClick={() => change_tag("omiyage")}><div id="omiyage"><Souvenir className={tag == "omiyage" ? "active" : false} /></div><p className={tag == "omiyage" ? "active" : "noacive"}>お土産</p></li>
                </ul>
            </div>
            <div className="pictures-blck">
                <ul>
                    <li>画像1</li>
                    <li>画像2</li>
                </ul>
            </div>
            <div className="pages-block">
                {page_names.map((page: Page) =>
                    <Page image={page.image} title={page.title} text={page.text} />
                )}
            </div>
        </div>
    )
}

export default Home