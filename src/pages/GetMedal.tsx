import * as React from "react";
import "./../../static/css/library.scss"

const GetMedal: React.FC = () => {
    return (
        <div className="get-medal">
            <div className="get-medal-block">
                <h2>店舗コードを入力しよう!!</h2>
                <div className="input-number-box">
                    <label>店舗コード</label>
                    <input type="text" value={1000}/>
                </div>
                <div>
                    <p>成功</p>
                </div>
            </div>
        </div>
    )
}

export default GetMedal;