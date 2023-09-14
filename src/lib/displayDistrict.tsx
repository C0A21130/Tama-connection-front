import * as React from "react";
import { Link } from "react-router-dom";

const displayDistrict = (district, districtData, setDistrict) => {
    let dist: Page;

    // 選択している地区名で表示を変更
    switch (district) {
        case "稲城": dist = districtData?.稲城; break;
        case "八王子": dist = districtData?.八王子; break;
        case "西東京": dist = districtData?.西東京; break;
        case "東大和": dist = districtData?.東大和; break;
    }

    // 表示
    return (
        <div className="district-block">
            <div className="district-buttons">
                <p>地区名を選択</p>
                <button onClick={() => setDistrict("稲城")}>稲城市</button>
                <button onClick={() => setDistrict("八王子")}>八王子市</button>
                <button onClick={() => setDistrict("西東京")}>西東京市</button>
                <button onClick={() => setDistrict("東大和")}>東大和市</button>
            </div>
            <div className="page-block">
                <Link to={`/gaid/${dist?.page_id}`}>
                    <h2>{dist?.title}</h2>
                    <p>{dist?.location_name}</p>
                    <div className="pic"><img src={dist?.image}></img></div>
                    <p>{dist?.text}</p>
                </Link>
                <button onClick={() => window.open(`https://maps.google.co.jp/maps?ll=${dist.location.x},${dist.location.y}`)}>Google MAPで開く</button>
            </div>
        </div>
    )
}

export default displayDistrict;