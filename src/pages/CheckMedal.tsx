import * as React from "react"
import axios, { AxiosRequestConfig } from "axios";
import { constant } from "./../constant"
import checkShop from "./../lib/checkShop";

import GoldMedal from "./../static/images/library/medal/gold_medal.svg";
import SilverMedal from "./../static/images/library/medal/silver_medal.svg";
import BronzeMedal from "./../static/images/library/medal/bronze_medal.svg";

// 自身が投稿したページ
interface Page {
    page_id: number,
    title: string,
    tag: string,
    text: string,
    user: number,
    location_name: string,
    location: {
        x: number,
        y: number
    },
    image: string
}

// 受け取ったデータ
interface ResponseBody {
    name: string,
    checked: number[],
    files: Page[] | null
}

const CheckMedal: React.FC = () => {
    const [responseBody, setResponseBody] = React.useState<ResponseBody>({name: "", checked: [], files: []});
    const config: AxiosRequestConfig = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }

    // 取得したメダルを表示する
    React.useEffect(() => {
        axios.get<ResponseBody>(`${constant.ROOT_URL}/user`, config)
        .then((response) => {
            setResponseBody(response.data);
        })
        .catch(() => {
            setResponseBody({name: "ネットワークエラー", checked: [], files: null});
        })
    },[])

    // 投稿数に応じてメダルを表示(3個以上：銅メダル、5個以上：銀メダル、10個以上：金メダル)
    const displayMedal = () => {
        // ネットエラーの場合の対応
        if (responseBody?.files === null) {
            return (
                <div className="medal-block">
                    <div className="text-block">
                        <p>ネットエラー</p>
                        <p>ネットに接続してください</p>
                    </div>
                </div>
            )
        }
        // 投稿数を取得
        const postCount: number = responseBody.files?.length;
        if(postCount > 9) {
            return (
                <div className="medal-block">
                    <div className="text-block">
                        <p>多摩地域マスター記者</p>
                        <p>投稿数：{postCount}</p>
                    </div>
                    <div className="pic"><GoldMedal /></div>
                </div>
            )
        } else if (postCount > 4) {
            return (
                <div className="medal-block">
                    <div className="text-block">
                        <p>多摩地域プロ記者</p>
                        <p>投稿数：{postCount}個</p>
                    </div>
                    <div className="pic"><SilverMedal /></div>
                </div>
            )
        } else if(postCount > 2) {
            return (
                <div className="medal-block">
                    <div className="text-block">
                        <p>多摩地域アマチュア記者</p>
                        <p>投稿数：{postCount}個</p>
                    </div>
                    <div className="pic"><BronzeMedal /></div>
                </div>
            )
        } else {
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

    return (
        <div className="check-medal">
            <h2>メダルを確認する</h2>
            {displayMedal()}
        </div>
    )
}

export default CheckMedal;

