import * as React from "react"
import "../../static/css/TabMenu.scss"

import Guide from "../../static/images/menu/book-opened.svg";
import Calendar from "../../static/images/menu/calendar.svg";
import Camera from "../../static/images/menu/camera.svg";
import Map from "../../static/images/menu/map.svg";


const TabMenu: React.FC = () =>{
    return(
        <div className="tab">
            <input id="guide" type="radio" name="tab_item" checked></input>
            <label className="tab_item" htmlFor="guide"><div><Guide /></div>ガイド</label>
            <input id="map" type="radio" name="tab_item"></input>
            <label className="tab_item" htmlFor="map"><div><Map /></div>マップ</label>
            <input id="library" type="radio" name="tab_item"></input>
            <label className="tab_item" htmlFor="library"><Camera /><br></br>ライブラリ</label>
            <input id="ranking" type="radio" name="tab_item"></input>
            <label className="tab_item" htmlFor="ranking"><Calendar /><br></br>ランキング</label>
        </div>
    )
}

export default TabMenu