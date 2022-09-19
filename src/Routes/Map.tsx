import * as React from "react";
import { Link } from "react-router-dom";
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
    r: number,
    image: string
}

const Map: React.FC = () => {
    const [data, setData] = React.useState<ResponseData[]>();
    let [myx, setMyx] = React.useState<number>(139);
    let [myy, setMyy] = React.useState<number>(35);

    // 現在地を取得
    navigator.geolocation.getCurrentPosition((position) => {
        setMyx(position.coords.longitude);
        setMyy(position.coords.latitude); 
    })

    React.useEffect(()=>{
        // 現在地から情報をAPIサーバから取得して地図を描画
        axios.get<ResponseData[]>(`${ROOT_URL}/map?myx=${myx}&myy=${myy}`)
        .then((response) => {
            setData(response.data);
            drawMap(response.data, myx, myy);
        })
    }, [myy])

    return (
        <div className="map">
            <h1>マップ</h1>
            <div id="svg"></div>
            <div>
                {data?.map((d, index) => {
                    return (
                        <div className="page-block" key={index}>
                            <Link to={`/gaid/${d.file_name}`}>
                                <h1>{index + 1}番：{d.title}</h1>
                                <div className="pic"><img src={ d.image }></img></div>
                            </Link>
                            <button onClick={() => { window.open(`https://maps.google.co.jp/maps?ll=${d.y},${d.x}`)}}>Google MAPで開く</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Map;