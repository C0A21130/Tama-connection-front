import * as React from "react";
import { Link, Outlet } from "react-router-dom";

import "./../static/css/library.scss";

import Restaurant from "./../static/images/library/restaurant.svg";
import Medal from "./../static/images/library/medal.svg";

const Library: React.FC = () =>{
    return(
        <div className="library">
            <h1>ライブラリ</h1>
            <div className="library-block">
            <ul>
                <li>
                    <Link to="/library/get">
                        <div className="picture"><Restaurant /></div>
                        <p>メダルを獲得</p>
                    </Link>
                </li>
                <li>
                    <Link to="/library/check">
                        <div className="picture"><Medal /></div>
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