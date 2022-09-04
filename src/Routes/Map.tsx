import * as React from "react";
import drawMap from "./drawMap";

import "./../../static/css/map.scss";

const Map: React.FC = () => {
    React.useEffect(()=>{
        drawMap()
    }, [])

    return (
        <div className="map">
            <h1>マップ</h1>
            <div id="svg"></div>
        </div>
    )
}

export default Map;