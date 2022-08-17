import * as React from "react"
import "../../static/css/TabMenu.scss"

const TabMenu: React.VFC = () =>{
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
            <div className="tab_content" id="guide_content">
                <div className="tab_content_description">
                    <p className="c-txtsp">～～～～～～～ガイドの内容～～～～～～～</p>
                </div>
            </div>
            <div className="tab_content" id="map_content">
                <div className="tab_content_description">
                    <p className="c-txtsp">～～～～～～～マップの内容～～～～～～～</p>
                </div>
            </div>
            <div className="tab_content" id="library_content">
                <div className="tab_content_description">
                    <p className="c-txtsp">～～～～～～ライブラリの内容～～～～～～</p>
                </div>
            </div>
            <div className="tab_content" id="ranking_content">
                <div className="tab_content_description">
                    <p className="c-txtsp">～～～～～～ランキングの内容～～～～～～</p>
                </div>
            </div>
        </div>
    )
}

export default TabMenu