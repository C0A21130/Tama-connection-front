import * as React from "react";
import drawMap from "./drawMap";

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