import * as React from "react";
import axios from "axios";
import "./../../static/css/postpage.scss";

const ROOT_URL = "http://localhost:5000";

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

    const submitPage = async () => {
        const render = new FileReader();
        const pictuer = document.querySelector<HTMLInputElement>("#picture-input");
        const file = pictuer.files[0];

        render.onload = (event) => {
            const base64Text = event.target.result
            console.log(base64Text)

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
                image: base64Text
            }

            console.log(body)
            // axios.post(ROOT_URL + "/page", body);
        }
        render.readAsDataURL(file)
        
    }

    return(
        <div className="post-page">
            <div className="post-page-block">
                <div className="title-block">
                    <label>タイトルの追加</label>
                    <div><input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input></div>
                </div>
                <div className="picture-block">
                    <label className="picture-label">写真を選択<input id="picture-input" type="file" accept="image/*" /></label>
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
                    <textarea name="comment" cols={20} rows={5} onChange={(event) => setText(event.target.value)}></textarea>
                </div>
                <div className="submit-button">
                    <button type="submit" onClick={() => submitPage()}>送信</button>
                </div>
            </div>
        </div>
    )
}

export default postPage;