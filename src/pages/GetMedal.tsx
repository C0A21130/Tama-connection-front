import * as React from "react";

type StateValues = "" | "成功"  | "失敗";

// (shopId:コード, shopName:お店の名前)
interface ShopDataType {
    shopId: number,
    shopName: string
}

// お店コードを作成
const shopDatas: ShopDataType[] = [
    {shopId: 1, shopName: "test1"},
    {shopId: 2, shopName: "test2"}
]

const GetMedal: React.FC = () => {
    const [inputNum, setInputNum] = React.useState<string>("1");
    const [state, setState] = React.useState<StateValues>("");

    // 用意されたお店のコードの中に入力された値が存在するか確認
    const checkShop = ():void => {
        const d = shopDatas.filter((shopData)=>{
            return shopData.shopId == Number(inputNum)
        })

        setState((d.length == 1) ? "成功" : "失敗" )
        
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
                    <button onClick={() => checkShop()}>送信</button>
                </div>
                <div>
                    <p>{state}</p>
                </div>
            </div>
        </div>
    )
}

export default GetMedal;