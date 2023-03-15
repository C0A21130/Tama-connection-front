import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { constant } from "./../constant";

import Load from "./../static/images/load.webm";
import LoadSub from "./../static/images/load.mp4";
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
interface ResponseNearbyData {
    page_count: number,
    locations: Location[],
    pages: Page[]
}

interface ResponseDistrictData {
    district_list: string[],
    稲城: Page,
    八王子: Page,
    東大和: Page
}

const Map: React.FC = () => {
    const [nearbyData, setNearbyData] = React.useState<ResponseNearbyData>({page_count: 0, locations: [], pages: []});
    const [districtData, setDistrictData] = React.useState<ResponseDistrictData>();
    const [load, setLoad] = React.useState<boolean>(true);
    const [status, setStatus] = React.useState<"nearby" | "district" | "Error">("district");
    const [district, setDistrict] = React.useState<"稲城" | "八王子" | "東大和">("稲城");
    let [myx, setMyx] = React.useState<number>(139);
    let [myy, setMyy] = React.useState<number>(35);

    const generateResponse = () => {
        switch (status) {
            case "district":
                let dist: Page;
                // 地区名の検索をしたことがないときはデータを受信する
                if (!districtData) {
                    axios.get<ResponseDistrictData>(`${ROOT_URL}/map?myx=0&myy=0&request=district`)
                    .then((response) => {
                        setDistrictData(response.data);
                        setLoad(false);
                    })
                    .catch(() => {
                        setStatus("Error");
                    })
                }
                // 選択している地区名で表示を変更
                switch (district) {
                    case "稲城": dist = districtData?.稲城; break;
                    case "八王子": dist = districtData?.八王子; break;
                    case "東大和": dist = districtData?.東大和; break;
                }
                // 表示を変更
                return (
                    <div className="page-block">
                        <div className="button-block">
                            <button onClick={() => setDistrict("稲城")}>稲城市</button>
                            <button onClick={() => setDistrict("八王子")}>八王子市</button>
                            <button onClick={() => setDistrict("東大和")}>東大和市</button>
                        </div>
                        <Link to={`/gaid/${dist?.page_id}`}>
                            <h2>{dist?.title}</h2>
                            <p>{dist?.location_name}</p>
                            <div className="pic"><img src={dist?.image}></img></div>
                            <p>{dist?.text}</p>
                        </Link>
                        <button onClick={() => window.open(`https://maps.google.co.jp/maps?ll=${dist.location.x},${dist.location.y}`)}>Google MAPで開く</button>
                    </div>
                )
            case "nearby":
                // 現在地から情報をAPIサーバから取得して地図を描画
                if(!nearbyData.page_count) {
                    axios.get<ResponseNearbyData>(`${ROOT_URL}/map?myx=${myx}&myy=${myy}`)
                    .then((response) => {
                        setNearbyData(response.data);
                        setLoad(false);
                    })
                    .catch(() => {
                        setStatus("Error");
                    })
                }

                return (
                    nearbyData.pages?.map((page, index) => {
                        return (
                            <div className="page-block" key={index}>
                                <Link to={`/gaid/${page.page_id}`}>
                                    <h2>{index + 1}番：{page.title}</h2>
                                    <p>{page.location_name}</p>
                                    <div className="pic"><img src={page.image} alt={page.title}></img></div>
                                    <p>{page.text}</p>
                                </Link>
                                <button onClick={() => { window.open(`https://maps.google.co.jp/maps?ll=${page.location.x},${page.location.y}`) }}>Google MAPで開く</button>
                            </div>
                        )
                    })
                )
            default:
                return <div>ネットワークエラー</div>
        }
    }

    // 現在地を取得
    navigator.geolocation.getCurrentPosition((position) => {
        setMyx(position.coords.longitude);
        setMyy(position.coords.latitude); 
    })

    return (
        <div className="map">
            <h1>マップ</h1>
            <div className="load">
                <video playsInline autoPlay muted loop ref={React.useRef<HTMLVideoElement>(null)} style={{ display: load ? "block" : "none" }}>
                    <source src={Load} type="video/webm" />
                    <source src={LoadSub} type="video/mp4" />
                </video>
                <p style={{display: status == "Error" ? "block" : "none"}}>ネットワークエラー</p>
            </div>
            <div>
                <button onClick={() => setStatus("district")}>地区名検索</button>
                <button onClick={() => setStatus("nearby")}>近場検索</button>
            </div>
            <div>
                {generateResponse()}
            </div>
        </div>
    )
}

export default Map;