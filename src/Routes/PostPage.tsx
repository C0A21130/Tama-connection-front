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

const PostPaage: React.FC = () => {
    const [title, setTitle] = React.useState<string>("たいとる");
    const [tag, setTag] = React.useState<string>("kankou");
    const [text, setText] = React.useState<string>("ぶんしょう");

    const submitPage = async () => {
        const render = new FileReader();
        const pictuer = document.querySelector<HTMLInputElement>("#picture");
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
                <div id="submit-button" onClick={() => submitPage()}>送信</div>
                <div className="title-block">
                    <label>タイトル</label>
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div className="picture-block">
                    <label>写真</label>
                    <input id="picture" type="file" accept="image/*" />
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
                    <label>説明</label>
                    <textarea value={text} onChange={(event) => setText(event.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default PostPaage;