import * as React from "react";
import axios, { AxiosRequestConfig } from "axios";
import CheckPageBlock from "../components/CheckPageBlock";
import { constant } from "./../constant";
import Load from "./../static/images/load.gif";

const ROOT_URL = constant.ROOT_URL;

interface Page {
    page_id: number,
    title: string,
    tag: "kankou" | "gurume" | "tamasanpo" | "omiyage",
    text: string,
    user: number,
    location_name: string,
    location: {
        x: number,
        y: number
    },
    image: string
}

interface ResponseBody {
    name: string,
    checked: number[],
    files: Page[] | null
}

const CheckPage: React.FC = () => {
    // ユーザーが投稿したページを保存する変数
    const [pages, setPages] = React.useState<Page[]>();
    const [userName, setUserName] = React.useState<string>("");

    // ヘッダーにJWTを設定
    const config: AxiosRequestConfig = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }

    React.useEffect(() => {
        axios.get<ResponseBody>(`${ROOT_URL}/user`, config)
        .then((response) => {
            setPages(response.data.files.reverse());
            setUserName(response.data.name);
        })
        .catch(() => {
            setPages([{page_id: -1, title: "ネットエラー", tag: "kankou", text: "ネットに接続してください", user: -1, location_name: "", location: {x: -1, y: -1}, image: ""}])
        })
    }, [])

    return (
        <div className="check-page">
            <div className="load" style={{display: pages ? "none" : "block"}}><img src={Load} alt="ロード中"/></div>
            <div className="user-name">
                <h2>{userName}</h2>
            </div>
            {pages?.map((page, index) =>
                <CheckPageBlock page_id={page.page_id} title={page.title} image={page.image} tag={page.tag} text={page.text} location_name={page.location_name} key={index} />
            )}
        </div>
    )
}

export default CheckPage;