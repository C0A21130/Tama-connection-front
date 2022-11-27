import * as React from "react";
import axios, { AxiosRequestConfig } from "axios";
import CheckPageBlock from "../components/CheckPageBlock";
import { constant } from "./../constant";

const ROOT_URL = constant.ROOT_URL;

interface Page {
    file_name: number,
    title: string,
    tag: string,
    text: string,
    user: number,
    location: {
        x: number,
        y: number
    },
    image: string
}

interface Data {
    name: string,
    checked: number[],
    pages: Page[]
}

const CheckPage: React.FC = () => {
    // ユーザーが投稿したページを保存する変数
    const [pages, setPages] = React.useState<Page[]>();

    // ヘッダーにJWTを設定
    const config: AxiosRequestConfig = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }

    React.useEffect(() => {
        axios.get<Data>(`${ROOT_URL}/user`, config)
        .then((response) => {
            setPages(response.data.pages.reverse())
        })
        .catch(()=>{
            setPages([])
        })
    }, [])

    return (
        <div className="check-page">
            {pages?.map((page, index) => 
                <CheckPageBlock title={page.title} image={page.image} tag={page.tag} text={page.text} key={index} />
            )}
        </div>
    )
}

export default CheckPage;