import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import "./../../static/css/Library.scss";

import Medal from "./../../static/images/Library/medal.svg";

const Library: React.FC = () =>{
    return(
        <div className="library">
            <h1>ライブラリ</h1>
            <ul>
                <li className="get-block">
                    <Link to="/library/get">
                        <p>メダルを取得する</p>
                    </Link>
                </li>
                <li className="medals-block">
                    <Medal width="60%" height="60%"/>
                    <p>取得したメダルを確認する</p>
                </li>
            </ul>
            <Outlet />
        </div>
    )
}

export default Library;