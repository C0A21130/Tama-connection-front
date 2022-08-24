import * as React from "react";
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
            <ul>
                <li onClick={() => change_tab("guide")} className={tab=="guide" ? "active" : "noactive"}><div><Guide /></div><p>ガイド</p></li>
                <li onClick={() => change_tab("map")} className={tab == "map" ? "active" : "noactive"}><div><Map /></div><p>マップ</p></li>
                <li onClick={() => change_tab("library")} className={tab == "library" ? "active" : "noactive"}><div><Library /></div><p>ライブラリ</p></li>
                <li onClick={() => change_tab("ranking")} className={tab == "ranking" ? "active" : "noactive"}><div><Ranking /></div><p>ランキング</p></li>
            </ul>
        </div>
    )
}

export default TabMenu