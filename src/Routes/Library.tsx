import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import "./../static/css/Library.scss";

import Restaurant from "./../static/images/library/restaurant.svg";
import Medal from "./../static/images/library/medals.svg";

const Library: React.FC = () =>{
    return(
        <div className="library">
            <h1>ライブラリ</h1>
            <div className="library-block">
            <ul>
                <li>
                    <a href="https://palanar.app/v2/ar_contents/79f4934a308d2fea">
                        <div className="picture"><Restaurant /></div>
                        <p>AR撮影</p>
                    </a>
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