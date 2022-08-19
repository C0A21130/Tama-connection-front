import * as React from "react";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import Page from "./components/Page";

import "./../static/css/home.scss";

const ROOT_URL = "https://";
const PICTTUR_NUM = 2;
const PAGE_NUM = 4;
 
const options: AxiosRequestConfig = {
    url: `${ROOT_URL}/page`,
    method: "GET" 
}

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
                    <li><div></div><p>観光地</p></li>
                    <li><div></div><p>グルメ</p></li>
                    <li><div></div><p>たまさんぽ</p></li>
                    <li><div></div><p>お土産</p></li>
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