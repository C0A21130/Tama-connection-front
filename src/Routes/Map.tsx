import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { constant } from "./../constant";
// import drawMap from "./../lib/drawMap";

import "./../static/css/map.scss";

const ROOT_URL = constant.ROOT_URL;

interface Location {
    location: {
        x: number,
        y: number,
        distance: number 
    },
    page_id: number
}

interface Page {
    page_id: number,
    title: string,
    tag: "kankou" | "gurume" | "tamasanpo" | "omiyage",
    text: string,
    user: number,
    location_name: string,
    location: {
        x: number,
        y: number,
        distance: number
    },
    image: string
}

// 受け取るデータの型
interface ResponseData {
    page_count: number,
    locations: Location[],
    pages: Page[]
}

const Map: React.FC = () => {
    const [data, setData] = React.useState<ResponseData>({page_count: 0, locations: [], pages: []});
    let [myx, setMyx] = React.useState<number>(139);
    let [myy, setMyy] = React.useState<number>(35);

    // 現在地を取得
    navigator.geolocation.getCurrentPosition((position) => {
        setMyx(position.coords.longitude);
        setMyy(position.coords.latitude); 
    })

    React.useEffect(()=>{
        // 現在地から情報をAPIサーバから取得して地図を描画
        axios.get<ResponseData>(`${ROOT_URL}/map?myx=${myx}&myy=${myy}`)
        .then((response) => {
            setData(response.data);
        })
    }, [myy])

    return (
        <div className="map">
            <h1>マップ</h1>
            <div>
                {data.pages?.map((page, index) => {
                    return (
                        <div className="page-block" key={index}>
                            <Link to={`/gaid/${page.page_id}`}>
                                <h2>{index + 1}番：{page.title}</h2>
                                <p>{page.location_name}</p>
                                <div className="pic"><img src={ page.image } alt={page.title}></img></div>
                            </Link>
                            <button onClick={() => { window.open(`https://maps.google.co.jp/maps?ll=${page.location.x},${page.location.y}`)}}>Google MAPで開く</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Map;