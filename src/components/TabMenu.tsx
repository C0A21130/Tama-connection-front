import * as React from "react"
import "../../static/css/TabMenu.scss"

const TabMenu: React.FC = () =>{
    return(
        <div className="tab">
            <input id="guide" type="radio" name="tab_item" checked></input>
            <label className="tab_item" htmlFor="guide">ガイド</label>
            <input id="map" type="radio" name="tab_item"></input>
            <label className="tab_item" htmlFor="map">マップ</label>
            <input id="library" type="radio" name="tab_item"></input>
            <label className="tab_item" htmlFor="library">ライブラリ</label>
            <input id="ranking" type="radio" name="tab_item"></input>
            <label className="tab_item" htmlFor="ranking">ランキング</label>
        </div>
    )
}

export default TabMenu