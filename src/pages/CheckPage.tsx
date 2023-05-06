import * as React from "react";
import axios, { AxiosRequestConfig } from "axios";
import CheckPageBlock from "../components/CheckPageBlock";
import { constant } from "./../constant";

import GoldMedal from "./../static/images/library/medal/gold_medal.svg";
import SilverMedal from "./../static/images/library/medal/silver_medal.svg";
import BronzeMedal from "./../static/images/library/medal/bronze_medal.svg";
import Load from "./../static/images/load.webm";
import LoadSub from "./../static/images/load.mp4";

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
    files: Page[]
}

const CheckPage: React.FC = () => {
    // ユーザーが投稿したページを保存する変数
    const [responseBody, setResponseBody] = React.useState<ResponseBody>({name: "", checked: [], files: [{page_id: 0, title: "確認中", tag: "kankou", text: "投稿確認中", user: 1,  location: {x: 0, y:0}, location_name: "", image: ""}]});
    // ヘッダーにJWTを設定
    const config: AxiosRequestConfig = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }
    // 投稿数に応じてメダルを表示(1個以上：銅メダル、5個以上：銀メダル、10個以上：金メダル)
    const displayMedal = () => {
        // 投稿数を取得
        const postCount: number = responseBody.files?.length;

        // ネットエラーの場合
        if ((postCount == 1) && (responseBody.files[0].page_id == -1)) { 
            return (
                <div className="medal-block">
                    <div className="text-block">
                        <p>ネットワークエラー</p>
                        <p>ネットに接続してください</p>
                    </div>
                </div>
            )
        }

        // 投稿数によってメダルを表示
        if (postCount >= 10) { // 投稿数が10個以上のとき
            return (
                <div className="medal-block">
                    <div className="text-block">
                        <p>多摩地域マスター記者</p>
                        <p>投稿数：{postCount}</p>
                    </div>
                    <div className="pic"><GoldMedal /></div>
                </div>
            )
        } else if (postCount >= 5) { // 投稿数が5~9個のとき
            return (
                <div className="medal-block">
                    <div className="text-block">
                        <p>多摩地域プロ記者</p>
                        <p>投稿数：{postCount}個</p>
                    </div>
                    <div className="pic"><SilverMedal /></div>
                </div>
            )
        } else if ((postCount >= 1) && (responseBody.files[0].page_id != 0)) { // 投稿数が1~4個のとき
            return (
                <div className="medal-block">
                    <div className="text-block">
                        <p>多摩地域アマチュア記者</p>
                        <p>投稿数：{postCount}個</p>
                    </div>
                    <div className="pic"><BronzeMedal /></div>
                </div>
            )
        } else if(!postCount) { // 投稿数が0個のとき
            return (
                <div className="medal-block">
                    <div className="text-block">
                        <p>多摩地域初心者記者</p>
                        <p>投稿数：{postCount}個</p>
                        <p>写真を投稿するとメダルをゲット!!</p>
                    </div>
                </div>
            )
        }
    }

    React.useEffect(() => {
        axios.get<ResponseBody>(`${ROOT_URL}/user`, config)
        .then((response) => {
            setResponseBody(response.data);
        })
        .catch(() => {
            setResponseBody({ name: "", checked: [], files: [{page_id: -1, title: "ネットエラー", tag: "kankou", text: "ネットに接続してください", user: -1, location_name: "", location: {x: -1, y: -1}, image: ""}]});
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