import * as React from "react";
import Compressor from "compressorjs";
import axios from "axios";

const ROOT_URL = "http://localhost:5000";
// const ROOT_URL = "https://tama-connection-backend.herokuapp.com";

type Tag = "kankou" | "gurume" | "tamasanpo" | "omiyage"; 

interface Other {
    user: string,
    location: {
        x: number,
        y: number
    }
}

interface sendBody {
    title: string,
    tag: string,
    text: string,
    other: Other,
    image: string | ArrayBuffer
}

const postPage: React.FC = () => {
    const [title, setTitle] = React.useState<string>("たいとる");
    const [tag, setTag] = React.useState<string>("kankou");
    const [text, setText] = React.useState<string>("ぶんしょう");
    const [pic, setPic] = React.useState<string>("")

    const render = new FileReader();
    const body: sendBody = {
        title: title,
        tag: tag,
        text: text,
        other: {
            user: "test_user",
            location: {
                x: -1,
                y: -1
            }
        },
        image: ""
    }

    const submitPage = (submit: boolean) => {
        const pictuer = document.querySelector<HTMLInputElement>("#picture-input");
        const file = pictuer.files[0];

        // 写真が選択されてなければ処理を抜ける
        if (file == undefined) { return }

        // 画像の圧縮
        new Compressor(file, {
            quality: 0.6,
            // 圧縮成功時の処理
            success(result) {
                // base64変換後の処理
                render.onload = () => {
                    body.image = render.result;
                    console.log(body);
                    // trueのときに送信し、送信しない際には画像をページに表示する
                    if (submit) {
                        axios.post(`${ROOT_URL}/page`, body)
                    } else {
                        setPic(body.image.toString())
                    }
                    
                }
                // Blobをbase64に変換
                render.readAsDataURL(result);
            },
            maxWidth: 1000,
            maxHeight: 1000,
            mimeType: "image/png"
        })
    }

    return(
        <div className="post-page">
            <div className="post-page-block">
                <div className="title-block">
                    <label>タイトルの追加</label>
                    <div><input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input></div>
                </div>
                <div className="picture-block">
                    <label className="picture-label">写真を選択<input id="picture-input" type="file" accept="image/*" onChange={(event) => submitPage(false)}/></label>
                    <div className="picture-box"><img src={pic}></img></div>
                </div>
                <div className="select-tag-block">
                    <label>タグを選択</label>
                    <select value={tag} onChange={(event) => setTag(event.target.value)}>
                        <option value="kankou">観光</option>
                        <option value="gurume">グルメ</option>
                        <option value="tamasanpo">たまさんぽ</option>
                        <option value="omiyage">お土産</option>
                    </select>
                </div>
                <div className="text-block">
                    <label>説明の追加</label>
                    <textarea value={text} cols={20} rows={5} onChange={(event) => setText(event.target.value)}></textarea>
                </div>
                <div className="submit-button">
                    <button type="submit" onClick={() => submitPage(true)}>送信</button>
                </div>
            </div>
        </div>
    )
}

export default postPage;