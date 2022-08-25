import * as React from "react";
import "../static/css/Library.scss";
import Camera from "../static/images/Library/camera.svg";
import Pan from "../static/images/Library/pan.svg";
import Touch from "../static/images/Library/shift.svg";
import Medal from "../static/images/Library/medal.svg"



const Library: React.FC = () =>{
    return(
        <>
        <br></br>
        <div className="container">
            <div className="button">
                <button><Camera/>
                <p>カメラ</p>
                </button>
            </div>
            <div className="button">
                <button><Pan/>
                <p>タッチ</p>
                </button>
            </div>
            <div className="button">
                <button><Touch/>
                <p>アップ</p>
                </button>
            </div>
        </div>
        <br></br>
        <div>
            取得したメダル
        </div>
        <div className="Check-Point">
            <Medal width="60%" height="60%"/>
            <span>チェックポイント</span>
        </div>
        <br></br>
        <div>今までに投稿した写真</div>
        <div className="submitted">
            <div>八王子ラーメン</div>
            <div>写真</div>
            <div>タグ：観光地</div>
            <div>説明</div>
        </div>
        </>
    )
}

export default Library