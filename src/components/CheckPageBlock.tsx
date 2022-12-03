import * as React from "react";
import axios from "axios";
import { constant } from "./../constant";
import Delete from "./../static/images/post/delete.svg";

interface PageProps {
    file_name: number
    title: string,
    image: string,
    tag: string,
    text: string
}

const CheckPageBlock: React.FC<PageProps> = (props) => {
    const { file_name, title, image, tag, text } = props;

    const [result, setResult] = React.useState<string>("");

    // タグ名を日本語に変換
    let tagName;
    switch (tag) {
        case "kankou":
            tagName = "多摩ファーム"; break;
        case "gurume":
            tagName = "グルメ"; break;
        case "tamasanpo":
            tagName = "たまさんぽ"; break;
        case "omiyage":
            tagName = "お土産"; break;
    }

    // 削除ボタンを押した際にAPIサーバーに投稿ページの削除をリクエスト
    const deletePage = () => {
        axios.delete(`${constant.ROOT_URL}/page/${file_name}`)
        .then(() => {
            setResult("この文章は削除されました。");
        })
        .catch(() => {
            setResult("ネットワークエラー")
        })
    }

    return (
        <div className="check-page-block">
            <button className="delete-button" onClick={() => deletePage()}><Delete /></button>
            <h3>タイトル：{title}</h3>
            <p>{result}</p>
            <div className="pic"><img alt={title} src={image}></img></div>
            <p>タグ：{tagName}</p>
            <p>文章：{text}</p>
        </div>
    )
}

export default CheckPageBlock;