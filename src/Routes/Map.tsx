import * as React from "react";
import axios from "axios";
import { constant } from "./../constant";
import displayDistrict from "./../lib/displayDistrict";
import displayNearby from "../lib/displayNearby";

import Load from "./../static/images/load.webm";
import LoadSub from "./../static/images/load.mp4";
import "./../static/css/map.scss";

interface Location {
    location: {
        x: number,
        y: number,
        distance: number 
    },
    page_id: number
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
    西東京: Page,
    東大和: Page
}

const Map: React.FC = () => {
    const [nearbyData, setNearbyData] = React.useState<ResponseNearbyData>({page_count: 0, locations: [], pages: []});
    const [districtData, setDistrictData] = React.useState<ResponseDistrictData>();
    const [load, setLoad] = React.useState<boolean>(true);
    const [status, setStatus] = React.useState<"nearby" | "district" | "Error">("district");
    const [district, setDistrict] = React.useState<"稲城" | "八王子" | "西東京" | "東大和">("稲城");
    let [myx, setMyx] = React.useState<number>(139);
    let [myy, setMyy] = React.useState<number>(35);

    const generateResponse = () => {
        switch (status) {
            case "district":
                // 地区名の検索をしたことがないときはデータを受信する
                if (!districtData) {
                    axios.get<ResponseDistrictData>(`${constant.ROOT_URL}/map?myx=0&myy=0&request=district`)
                    .then((response) => {
                        setDistrictData(response.data);
                        setLoad(false);
                    })
                    .catch(() => {
                        setStatus("Error");
                    })
                }

                return displayDistrict(district, districtData, setDistrict);
            case "nearby":
                // 現在地から情報をAPIサーバから取得して地図を描画
                if (!nearbyData.page_count) {
                    axios.get<ResponseNearbyData>(`${constant.ROOT_URL}/map?myx=${myx}&myy=${myy}`)
                    .then((response) => {
                        setNearbyData(response.data);
                        setLoad(false);
                    })
                    .catch(() => {
                        setStatus("Error");
                    })
                }
                
                return displayNearby(nearbyData);
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
            <div className="mode-button">
                <button onClick={() => setStatus("district")}>地区名検索</button>
                <button onClick={() => setStatus("nearby")}>近場表示</button>
            </div>
            <div>
                {generateResponse()}
            </div>
        </div>
    )
}

export default Map;