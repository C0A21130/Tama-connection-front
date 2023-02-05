import * as React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { constant } from "./../constant";
import checkShop from "./../lib/checkShop"

type StateValues = "" | "成功"  | "失敗" | "既にチェック済み";

const GetMedal: React.FC = () => {
    const [inputNum, setInputNum] = React.useState<string>("0");
    const [state, setState] = React.useState<StateValues>("");
    const config: AxiosRequestConfig = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }

    // 送信ボタンを押したときの処理
    const getShop = ():void => {
        // 用意されたお店のコードの中に入力された値が存在するか確認
        const shopId: number = Number(inputNum)
        const num = checkShop(shopId).length;

        // お店のIDがJSONファイルに存在しないときに終了する
        if (num == 0) {
            setState("失敗");
            return 
        }
        
        // ユーザーのチェックポイント情報を更新
        axios.put(`${constant.ROOT_URL}/user`, {shop_id : shopId}, config)
        .then((response) => {
            // 既にチェック済みの場合は失敗を表示
            if(response.data == "error checked") {
                setState("既にチェック済み");
            // 成功した際に画面に成功を表示
            } else {
                setState("成功");
            }
        })
        .catch(() => {
            setState("失敗");
        })
    }

    return (
        <div className="get-medal">
            <div className="get-medal-block">
                <h2>店舗コードを入力しよう!!</h2>
                <div className="input-number-box">
                    <label>店舗コード</label>
                    <input type="text" value={inputNum.toString()} onChange={(event) => setInputNum(event.target.value)}/>
                </div>
                <div>
                    <button onClick={() => getShop()}>ゲット</button>
                </div>
                <div>
                    <p>{state}</p>
                </div>
            </div>
        </div>
    )
}

export default GetMedal;