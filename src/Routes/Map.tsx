import * as React from "react";
import axios from "axios";
import { constant } from "./../constant";
import drawMap from "./../lib/drawMap";

import "./../static/css/map.scss";

const ROOT_URL = constant.ROOT_URL;
const DXY = 20;
const DZ = 1.2;

// 受け取るデータの型
interface ResponseData {
    file_name: number,
    x: number,
    y: number,
    r: number
}

const Map: React.FC = () => {
    const [x, setX] = React.useState<number>(0);
    const [y, setY] = React.useState<number>(0);
    const [z, setZ] = React.useState<number>(1);

    const [status, setStatus] = React.useState<boolean>(true);
    const [data, setData] = React.useState<ResponseData[]>();

    React.useEffect(()=>{
        // 最初に画面を描画したときだけ実行
        if (status) {
            axios.get<ResponseData[]>(`${ROOT_URL}/map?myx=120&myy=30`)
            .then((response) => {
                setData(response.data);
                drawMap(response.data, x, y, z);
            })
            setStatus(false);
        // 2回目以降の描画を行う
        } else {
            drawMap(data, x, y, z);
        }
    }, [x, y, z])

    return (
        <div className="map">
            <h1>マップ</h1>
            <div className="x-block">
                <button onClick={() => setX(x - DXY)}>-X</button>
                <p>{-1 * x}</p>
                <button onClick={() => setX(x + DXY)}>+X</button>
            </div>
            <div className="center-block">
                <div id="svg"></div>
                <div className="y-block">
                    <button onClick={() => setY(y - DXY)}>+Y</button>
                    <p>{-1 * y}</p>
                    <button onClick={() => setY(y + DXY)}>-Y</button>
                </div>
            </div>
            <div className="z-block">
                <button onClick={() => setZ(z * DZ)}>+Z</button>
                <p>{z}</p>
                <button onClick={() => setZ(z / DZ)}>-Z</button>
            </div>
        </div>
    )
}

export default Map;