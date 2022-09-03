import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import "./../../static/css/Library.scss";

import Restaurant from "./../../static/images/Library/restaurant.svg";
import Medal from "./../../static/images/Library/medal.svg";

const Library: React.FC = () =>{
    return(
        <div className="library">
            <h1>ライブラリ</h1>
            <div className="library-block">
            <ul>
                <li>
                    <Link to="/library/get">
                        <Restaurant />
                        <p>メダルを獲得</p>
                    </Link>
                </li>
                <li>
                    <Link to="/library/check">
                        <Medal width="100%" height="40%" />
                        <p>メダルを確認</p>
                    </Link>
                </li>
            </ul>
            </div>
            <Outlet />
        </div>
    )
}

export default Library;