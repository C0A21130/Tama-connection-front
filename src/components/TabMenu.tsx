import * as React from "react";
import {Link} from "react-router-dom";

import Guide from "./../static/images/tab_menu/guide.svg";
import Map from "./../static/images/tab_menu/map.svg";
import Library from "./../static/images/tab_menu/library.svg";
import Ranking from "./../static/images/tab_menu/ranking.svg";

type Tab = "guide" | "map" | "library" | "postPage";

const TabMenu: React.FC = () =>{

    const [tab, setTab] = React.useState<Tab>("guide");

    return(
        <div className="tab-menu">
            <ul className="tab">
                <li className="tab-item" onClick={() => setTab("guide")} id={tab == "guide" ? "active" : "noactive"}>
                    <Link to="/">
                        <div className="item">
                            <div className="pic"><Guide /></div>
                            <p>ホーム</p>
                        </div>
                    </Link>
                </li>
                <li className="tab-item" onClick={() => setTab("map")} id={tab == "map" ? "active" : "noactive"}>
                    <Link to="/map">
                        <div className="item">
                            <div className="pic"><Map /></div>
                            <p>マップ</p>
                        </div>
                    </Link>
                </li>
                <li className="tab-item" onClick={() => setTab("library")} id={tab == "library" ? "active" : "noactive"}>
                    <Link to="/camera">
                        <div className="item">
                            <div className="pic"><Library /></div>
                            <p>ARカメラ</p>
                        </div>
                    </Link>
                </li>
                <li className="tab-item" onClick={() => setTab("postPage")} id={tab == "postPage" ? "active" : "noactive"}>
                    <Link to="/post">
                        <div className="item">
                            <div className="pic"><Ranking /></div>
                            <p>投稿</p>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default TabMenu