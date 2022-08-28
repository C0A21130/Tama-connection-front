import * as React from "react";
import "./../../static/css/postpage.scss";

const PostPage: React.FC = () => {
    const [title, setTitle] = React.useState<string>("");
    const [tag, setTag] = React.useState("kankou");

    return(
        <div className="post-page">
            <div className="post-page-block">
                <div className="title-block">
                    <label>タイトル
                    <div><input type="text" placeholder="タイトル" value={title} onChange={(event) => setTitle(event.target.value)}></input></div>
                    </label>
                </div>

                <div className="picture-block">
                    <label>メインの写真<input type="file" /></label>
                </div>

                <div className="select-tag-block">
                    <label>タグを選択</label>
                    <br></br>
                    <select value={tag} onChange={(event) => setTag(event.target.value)}>
                        <option value="kankou">観光</option>
                        <option value="gurume">グルメ</option>
                        <option value="tamasanpo">たまさんぽ</option>
                        <option value="omiyage">お土産</option>
                    </select>
                </div>

                <div className="text-block">
                    <label>説明</label>
                    <br></br>
                    <textarea name="comment" cols={20} rows={5}></textarea>
                </div> 
                <div className="picture-block">
                    <label>写真を追加する<input type="file" /></label>
                </div>

                <div className="submit-button">
                    <label>送信する</label>
                    <br></br>
                    <button  id="test" type="submit">送信</button>
                </div>
            </div>
        </div>
    )
}

export default PostPage;