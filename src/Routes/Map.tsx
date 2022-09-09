import * as React from "react";
import axios from "axios";
import { constant } from "./../constant";
import drawMap from "./../lib/drawMap";

import "./../static/css/map.scss";

const ROOT_URL = constant.ROOT_URL;

interface ResponseData {
    file_name: number,
    x: number,
    y: number,
    r: number
}

const Map: React.FC = () => {
    let status = true;
    let data: ResponseData;
    React.useEffect(()=>{
        if (status) {
            axios.get<ResponseData>(`${ROOT_URL}/map?myx=120&myy=30`)
            .then((response) => {
                data = response.data
                console.log(data);
                status = false;
                drawMap(data);
            })
        } else {
            drawMap(data);
        }
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