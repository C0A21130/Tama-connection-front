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
 
const options: AxiosRequestConfig = {
    url: `${ROOT_URL}/page`,
    method: "GET" 
}

// ページのデータ型を定義
interface Page{
    image: string
    title: string
    text: string
}

const page: Page = {
    "image" : "",
    "title" : "title",
    "text" : "text"
}

const Home: React.FC = ()=>{
    const [page_names, setPageNames] = React.useState<Page[]>([]);

    // viewをエンコードしたあとにページの情報を取得
    React.useEffect(() => {
        axios(options)
        .then((respons: AxiosResponse<Page[]>) => {
            const {data} = respons
            setPageNames(data)
        })
        .catch((error)=>{
            console.log(error)
            setPageNames([page, page, page])
        })

    }, [])


    return(
        <div className="home">
            <div className="tag-menu-block">
                <ul>
                    <li><div id="sightseeing"><Sightseeing /></div><p>観光地</p></li>
                    <li><div id="gourumet"><Gourmet /></div><p>グルメ</p></li>
                    <li><div id="walking"><Walking /></div><p>たまさんぽ</p></li>
                    <li><div id="omiyage"><Souvenir /></div><p>お土産</p></li>
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