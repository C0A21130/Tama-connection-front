import * as React from "react"
import "../../static/css/TabMenu.scss"

import Guide from "./../../static/images/tab_menu/guide.svg";
import Map from "./../../static/images/tab_menu/map.svg";
import Library from "../../static/images/tab_menu/library.svg";
import Ranking from "../../static/images/tab_menu/ranking.svg";

const TabMenu: React.FC = () =>{
    return(
        <div className="tab-menu">
            <ul>
                <li><div><Guide /></div><p>ガイド</p></li>
                <li><div><Map /></div><p>マップ</p></li>
                <li><div><Library /></div><p>ライブラリ</p></li>
                <li><div><Ranking /></div><p>ランキング</p></li>
            </ul>
        </div>
    )
}

export default TabMenu