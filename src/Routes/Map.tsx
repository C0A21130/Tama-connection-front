import * as React from "react";
import axios from "axios";
import { constant } from "./../constant";
import drawMap from "./../lib/drawMap";

import "./../static/css/map.scss";

const ROOT_URL = constant.ROOT_URL;

// 受け取るデータの型
interface ResponseData {
    file_name: number,
    x: number,
    y: number,
    r: number
}

// 位置情報の項目
type Location = "x" | "y" | "z";

// 増減の変化の項目
type Fluctuation = "increase" | "decrease";

const Map: React.FC = () => {
    const [x, setX] = React.useState<number>(0);
    const [y, setY] = React.useState<number>(0);
    const [z, setZ] = React.useState<number>(1);

    let status = true;
    let data: ResponseData;

    React.useEffect(()=>{
        // 最初に画面を描画したときだけ実行
        if (status) {
            axios.get<ResponseData>(`${ROOT_URL}/map?myx=120&myy=30`)
            .then((response) => {
                data = response.data
                console.log(data);
                status = false;
                drawMap(data, x, y, z);
            })
        // 2回目以降の描画を行う
        } else {
            drawMap(data, x, y, z);
        }
    }, [x, y, z])

    // 位置を変える
    const changeLocation = (loc: Location, fluct: Fluctuation) => {
        switch (loc) {
            case "x":
                break;
            case "y":
                break;
            case "z":
                break;
        }
    }

    return (
        <div className="map">
            <h1>マップ</h1>
            <div className="x-block">
                <button>-X</button>
                <p>{x}</p>
                <button>-X</button>
            </div>
            <div className="center-block">
                <div id="svg"></div>
                <div className="y-block">
                    <button>+Y</button>
                    <p>{y}</p>
                    <button>-Y</button>
                </div>
            </div>
            <div className="z-block">
                <button>+Z</button>
                <p>{z}</p>
                <button>-Z</button>
            </div>
        </div>
    )
}

export default Map;