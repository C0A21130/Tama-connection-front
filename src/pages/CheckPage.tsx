import * as React from "react";
import axios, { AxiosRequestConfig } from "axios";
import CheckPageBlock from "../components/CheckPageBlock";
import { constant } from "./../constant";
import selectMedal from "../lib/selectMedal";

import Load from "./../static/images/load.webm";
import LoadSub from "./../static/images/load.mp4";

interface ResponseBody {
    name: string,
    checked: number[],
    files: Page[]
}

const CheckPage: React.FC = () => {
    // ユーザーが投稿したページを保存する変
    const [responseBody, setResponseBody] = React.useState<ResponseBody>({name: "", checked: [], files: []});
    // ヘッダーにJWTを設定
    const config: AxiosRequestConfig = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }
    // 投稿数に応じてメダルを表示(1個以上：銅メダル、5個以上：銀メダル、10個以上：金メダル)
    const displayMedal = () => {
        const postCount: number = responseBody.files?.length;
        const select = selectMedal(postCount, responseBody.files[0]?.page_id);

        // 投稿数によってメダルを表示
        return (
            <div className="medal-block">
                <div className="text-block">
                    <p>{select?.p}</p>
                    <p>投稿数：{postCount}</p>
                </div>
                {select?.medal}
            </div>
        )
    }

    React.useEffect(() => {
        axios.get<ResponseBody>(`${constant.ROOT_URL}/user`, config)
        .then((response) => {
            setResponseBody(response.data);
        })
        .catch(() => {
            setResponseBody({ name: "", checked: [], files: [{page_id: -1, title: "ネットエラー", tag: "kankou", text: "ネットに接続してください", user: -1, location_name: "", location: {x: -1, y: -1}, image: "", good: 0, go: 0, went: 0, user_status: []}]});
        })
    }, [])

    return (
        <div className="check-page">
            <div className="load" style={{display: responseBody.files[0]?.page_id == 0 ? "block" : "none"}}>
                <video playsInline autoPlay muted loop ref={React.useRef<HTMLVideoElement>(null)}>
                    <source src={Load} type="video/webm" />
                    <source src={LoadSub} type="video/mp4" />
                </video>
            </div>
            <div className="check-medal">
                <h2>メダルを確認:{responseBody.name}</h2>
                {displayMedal()}
            </div>
            {responseBody.files?.map((file, index) =>
                <CheckPageBlock
                    page_id={file.page_id}
                    title={file.title}
                    image={file.image}
                    tag={file.tag}
                    text={file.text}
                    location_name={file.location_name}
                    key={index}
                />
            )}
        </div>
    )
}

export default CheckPage;