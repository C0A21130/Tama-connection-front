import * as React from "react";
import checkShop from "./../lib/checkShop"

type StateValues = "" | "成功"  | "失敗";

const GetMedal: React.FC = () => {
    const [inputNum, setInputNum] = React.useState<string>("0");
    const [state, setState] = React.useState<StateValues>("");

    // 用意されたお店のコードの中に入力された値が存在するか確認
    const getShop = ():void => {
        const num = checkShop(Number(inputNum)).length;
        setState(((num==1) ? "成功" : "失敗"))
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
                    <button onClick={() => getShop()}>送信</button>
                </div>
                <div>
                    <p>{state}</p>
                </div>
            </div>
        </div>
    )
}

export default GetMedal;