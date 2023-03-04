import * as React from "react";
import Compressor from "compressorjs";
import axios, { AxiosRequestConfig } from "axios";
import { constant } from "./../constant";

import Imagae from "./../static/images/post/image.svg";
import Upload from "./../static/images/post/upload.svg"

const ROOT_URL = constant.ROOT_URL;

interface sendBody {
    title: string,
    tag: string,
    text: string,
    location_name: string,
    location: {
        x: number,
        y: number
    }
    image: string | ArrayBuffer
}

const postPage: React.FC = () => {
    // 投稿内容を保存する
    const [title, setTitle] = React.useState<string>("");
    const [tag, setTag] = React.useState<string>("kankou");
    const [text, setText] = React.useState<string>("");
    const [pic, setPic] = React.useState<string>("");
    const [locationName, setLocationName] = React.useState<string>("");
    const [status, setStatus] = React.useState<"送信"|"送信中"|"成功"|"失敗">("送信");

    // 現在地を保存する
    const [myx, setMyx] = React.useState(0);
    const [myy, setMyy] = React.useState(0);

    //画像圧縮モジュールの作成
    const render = new FileReader();
    // 送信のHTTPheaderの設定
    const config: AxiosRequestConfig = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }

    const body: sendBody = {
        title: title,
        tag: tag,
        text: text,
        location_name: locationName,
        location: {
            x: myx,
            y: myy
        },
        image: ""
    }

    // 現在地を取得
    navigator.geolocation.getCurrentPosition((position) => {
        setMyx(position.coords.longitude);
        setMyy(position.coords.latitude);
    })

    // 送信ボタンを押したときの処理
    const submitPage = (submit: boolean) => {
        const pictuer = document.querySelector<HTMLInputElement>("#picture");
        const file = pictuer.files[0];

        // 写真とタイトルが選択されいないか送信中の場合は処理を抜ける
        if (file == undefined || status == "送信中") { return }

        // 画像の圧縮
        new Compressor(file, {
            quality: 0.8,
            // 圧縮成功時の処理
            success(result) {
                // base64変換後の処理
                render.onload = () => {
                    body.image = render.result;
                    // 送信ボタンを押しタイトルを入力していればデータを投稿する
                    if (submit && title != "") {
                        setStatus("送信中");
                        axios.post(`${ROOT_URL}/page`, body, config)
                        .then(() => {
                            setStatus("成功");
                        })
                        .catch(() => {
                            setStatus("失敗");
                        })
                    // 送信せずに画像をページに表示する
                    } else {
                        setPic(body.image.toString())
                    }
                    
                }
                // Blobをbase64に変換
                render.readAsDataURL(result);
            },
            maxWidth: 800,
            maxHeight: 800,
            mimeType: "image/png",
        })
    }

    return(
        <div className="post-page">
            <div className="picture-block">
                <div className="input-picture">
                    <div className="image"><Imagae /></div>
                    <label>写真を選択<input id="picture" type="file" accept="image/*" onChange={() => submitPage(false)} /></label>
                </div>
                <div className="picture-box" style={{display: pic == "" ? "none" : "block"}}><img src={pic} alt="選択した写真を表示"></img></div>
            </div>
            <div className="title-block">
                <input type="text" value={title} placeholder="タイトル" onChange={(event) => setTitle(event.target.value)}></input>
            </div>
            <div className="select-tag-block">
                <label>タグを選択</label>
                <select value={tag} title="タグを選択" onChange={(event) => setTag(event.target.value)}>
                    <option value="kankou">たまファーム</option>
                    <option value="gurume">グルメ</option>
                    <option value="tamasanpo">たまさんぽ</option>
                    <option value="omiyage">お土産</option>
                </select>
            </div>
            <div className="location-name-block">
                <input type="text" value={locationName} placeholder="撮影場所" onChange={(event) => setLocationName(event.target.value)}></input>
            </div>
            <div className="text-block">
                <textarea value={text} cols={20} rows={5} placeholder="文章" onChange={(event) => setText(event.target.value)}></textarea>
            </div>
            <button className="submit-button" type="submit" onClick={() => submitPage(true)}>
                <div className="upload"><Upload /></div>
                <p>{status}</p>
            </button>
            <p>投稿された写真は後日ポスターカードとしてアプリ外でも掲示される可能性があります</p>
        </div>
    )
}

export default postPage;