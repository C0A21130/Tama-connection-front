import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import "./../../static/css/library.scss";

import Medal from "./../../static/images/Library/medal.svg";

const Library: React.FC = () =>{
    return(
        <div className="library">
            <h1>ライブラリ</h1>
            <div className="library-block">
            <ul>
                <li>
                    <Link to="/library/get">
                        <p>メダルを取得する</p>
                    </Link>
                </li>
                <li>
                    <Link to="/library/check">
                        <Medal width="100%" height="40%" />
                        <p>取得したメダルを確認する</p>
                    </Link>
                </li>
            </ul>
            </div>
            <Outlet />
        </div>
    )
}

export default Library;