import * as React from "react";
import "./../static/css/camera.scss";
import Nasinosuke from "./../static/images/camera/nashinosuke.png";
import KitunePhoto from "./../static/images/camera/kitune_photo.svg";
import KituneSearch from "./../static/images/camera/kitune_search.svg";

const Camera: React.FC = () => {
    return (
        <div className="camera">
            <h1>ARカメラ</h1>
            <div className="camera-block">
            <h2>稲城なしのすけ</h2>
            <ul>
                <li>
                    <a href="https://palanar.app/v2/ar_contents/79f4934a308d2fea">
                        <div className="nasinosuke"><img src={Nasinosuke} alt="nasinosuke" /></div>
                        <p>記念撮影</p>
                    </a>
                </li>
            </ul>
            <h2>東伏見稲荷神社</h2>
            <ul>
                <li>
                    <a href="https://palanar.app/v2/ar_contents/4601193eec02773c">
                        <div className="kitune"><KitunePhoto /></div>
                        <p>白狐と記念撮影</p>
                    </a>
                </li>
                <li>
                    <a href="https://palanar.com/ar_contents/4b83245afacf3760">
                        <div className="kitune"><KituneSearch /></div>
                        <p>白狐を探そう</p>
                    </a>
                </li>
            </ul>
            </div>
            <div className="camera-description">
                <div>
                    <h2>稲城なしのすけと記念撮影をしよう</h2>
                    <p>稲城なしのすけとは大河原邦男博士と井上ジェット博士に、“稲城の梨”をモチーフに創ってもらった梨型メカです。ARカメラでは稲城なしのすけと一緒に記念撮影をすることができます。</p>
                    <a href="https://www.city.inagi.tokyo.jp/kanko/inagi_nasinosuke/inaginashinosuke.html">稲城なしのすけ紹介ページ</a>
                </div>
                <div>
                    <h2>東伏見稲荷神社で白狐を撮影</h2>
                    <p>東伏見稲荷とは京都の伏見稲荷大社の御分霊を奉迎し、昭和4年に東京都西東京市で創建された神社です。拝殿で神の使い手である白狐と記念撮影を撮ったり、ARカメラで千本鳥居にいる白狐を探してみましょう。</p>
                    <a href="http://www.higashifushimi-inari.jp/">東伏見稲荷神社紹介ページ</a>
                </div>
            </div>
        </div>
    )
};

export default Camera;