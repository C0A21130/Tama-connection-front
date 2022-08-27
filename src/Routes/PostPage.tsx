import * as React from "react";
import "./../../static/css/postpage.scss";

const PostPaage: React.FC = () => {
    return(
        <div className="post-page">
            <div className="post-page-block">
                <div>
                    <label>タイトル<input /></label>
                </div>
                <div>
                    <label>写真<input type="file" /></label>
                </div>
                <div>
                    <label>タグを選択
                        <select>
                            <option value="kankou">観光</option>
                            <option value="gurume">グルメ</option>
                            <option value="tamasanpo">たまさんぽ</option>
                            <option value="omiyage">お土産</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>説明<input type="text" /></label>
                </div>
            </div>
        </div>
    )
}

export default PostPaage;