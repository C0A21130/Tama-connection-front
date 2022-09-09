import * as React from "react";
import axios from "axios";
import { constant } from "./../constant";
import drawMap from "./../lib/drawMap";

import "./../static/css/map.scss";

const ROOT_URL = constant.ROOT_URL;

const Map: React.FC = () => {
    React.useEffect(()=>{
        drawMap()
    }, [])

    return (
        <div className="map">
            <h1>マップ</h1>
            <div className="x-block">
                <button>-X</button>
                <button>-X</button>
            </div>
            <div className="center-block">
                <div id="svg"></div>
                <div className="y-block">
                    <button>+Y</button>
                    <button>-Y</button>
                </div>
            </div>
            <div className="z-block">
                <button>+Z</button>
                <button>-Z</button>
            </div>
        </div>
    )
}

export default Map;