import * as React from "react";
import {Link} from "react-router-dom";
import "../../static/css/TabMenu.scss";

import Guide from "./../../static/images/tab_menu/guide.svg";
import Map from "./../../static/images/tab_menu/map.svg";
import Library from "../../static/images/tab_menu/library.svg";
import Ranking from "../../static/images/tab_menu/ranking.svg";

type Tab = "guide" | "map" | "library" | "ranking";

const TabMenu: React.FC = () =>{

    const [tab, setTab] = React.useState<Tab>("guide");

    const change_tab = (tab_name:Tab) => {
        setTab(tab_name);
    };

    return(
        <div className="tab-menu">
            <ul className="tab">
                <li className="tab-item" onClick={() => change_tab("guide")} id={tab == "guide" ? "active" : "noactive"}><Link to="/"><div><Guide /></div><p>ガイド</p></Link></li>
                <li className="tab-item" onClick={() => change_tab("map")} id={tab == "map" ? "active" : "noactive"}><div><Map /></div><p>マップ</p></li>
                <li className="tab-item" onClick={() => change_tab("library")} id={tab == "library" ? "active" : "noactive"}><Link to="/library"><div><Library /></div><p>ライブラリ</p></Link></li>
                <li className="tab-item" onClick={() => change_tab("ranking")} id={tab == "ranking" ? "active" : "noactive"}><Link to="/postpage"><div><Ranking /></div><p>ランキング</p></Link></li>
            </ul>
        </div>
    )
}

export default TabMenu