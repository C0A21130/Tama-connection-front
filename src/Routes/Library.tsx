import * as React from "react";
import "./../../static/css/Library.scss";

import Medal from "./../../static/images/Library/medal.svg";

const Library: React.FC = () =>{
    return(
        <div className="library">
            <div className="medals-blok">
                <p>メダルを取得する</p>
                <div>ボタン</div>
            </div>
            <div className="medals-blok">
                <div>取得したメダル</div>
                <Medal width="60%" height="60%"/>
                <p>チェックポイント</p>
            </div>
        </div>
    )
}

export default Library;