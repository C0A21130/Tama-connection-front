import * as React from "react";
import "./../../static/css/postpage.scss";

const PostPaage: React.FC = () => {
    return(
        <div className="post-page">
            <div className="post-page-block">
                <div className="title-block">
                    <label>タイトル</label>
                    <input type="text"/>
                </div>
                <div className="picture-block">
                    <label>写真<input type="file" /></label>
                </div>
                <div className="select-tag-block">
                    <label>タグを選択</label>
                    <select>
                        <option value="kankou">観光</option>
                        <option value="gurume">グルメ</option>
                        <option value="tamasanpo">たまさんぽ</option>
                        <option value="omiyage">お土産</option>
                    </select>
                </div>
                <div className="text-block">
                    <label>説明<textarea /></label>
                </div>
            </div>
        </div>
    )
}

export default PostPaage;