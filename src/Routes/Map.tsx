import * as React from "react";
import axios from "axios";
import { constant } from "./../constant";
import drawMap from "./../lib/drawMap";

import "./../static/css/map.scss";

const ROOT_URL = constant.ROOT_URL;

// 受け取るデータの型
interface ResponseData {
    file_name: number,
    title: string,
    tag: string,
    x: number,
    y: number,
    r: number
}

const Map: React.FC = () => {
    const [data, setData] = React.useState<ResponseData[]>();

    React.useEffect(()=>{
        axios.get<ResponseData[]>(`${ROOT_URL}/map?myx=120&myy=30`)
        .then((response) => {
            setData(response.data);
            drawMap(response.data, 139.33, 35.65);
        })
    }, [])

    return (
        <div className="map">
            <h1>マップ</h1>
            <div id="svg"></div>
            <div>
                {data?.map((d, index) => {
                    return (
                        <div key={index}>
                            <h1>{d.title}</h1>
                            <p>{d.tag}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Map;