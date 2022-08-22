import * as React from "react";
import "./../../static/css/Header.scss";

const head: React.FC = () =>{
    return(
        <div id="header">
        <header>
            <div className="header-block">
                <p>アイコン</p>
                <input type="text" placeholder="検索したいもの"/>
                <input type="submit" value="検索"/>
            </div>
        </header>
        </div>
    )
};

export default head;