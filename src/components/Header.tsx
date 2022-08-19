import * as React from "react";
import "./../../static/css/Header.scss";

const head: React.FC = () =>{
    return(
        <div id="header">
        <header>
            <p>アイコン
                <input type="text" placeholder="検索したいもの"></input>
                <input type="submit" value="検索"></input>
            </p>
        </header>
        </div>
    )
};

export default head;