import * as React from "react";
import axios from "axios";
import { constant } from "./../constant";
import Delete from "./../static/images/post/delete.svg";

interface PageProps {
    page_id: number
    title: string,
    image: string,
    tag: string,
    text: string,
    location_name: string
}

const CheckPageBlock: React.FC<PageProps> = (props) => {
    const { page_id, title, image, tag, text, location_name } = props;

    const [result, setResult] = React.useState<string>("");
    const [confirmation, setConfirmation] = React.useState<boolean>(false);

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
        axios.delete(`${constant.ROOT_URL}/page/${page_id}`)
        .then(() => {
            setResult("この文章は削除されました。");
        })
        .catch(() => {
            setResult("ネットワークエラー")
        })
    }

    return (
        <div className="check-page-block" style={{display: page_id == 0 || page_id == -1 ? "none" : "block"}}>
            <div className="delete-block">
                <div style={{ display: confirmation ? "block" : "none" }} className="confilrm">
                    <p>本当に削除してもいいですか？</p>
                    <button onClick={() => deletePage()} title="写真削除本確認ボタン">はい</button>
                    <button onClick={() => setConfirmation(false)} title="写真削除取り消しボタン">いいえ</button>
                </div>
                <button className="delete-button" onClick={() => setConfirmation(true)} title="写真削除ボタン">
                    <div className="icon"><Delete /></div>
                </button>
            </div>
            <h3>タイトル：{title}</h3>
            <p>{result}</p>
            <div className="pic"><img alt={title} src={image}></img></div>
            <p>タグ：{tagName}</p>
            <p style={{display: !location_name || location_name=="" ? "none" : "block" }}>撮影場所：{location_name}</p>
            <p>文章：{text}</p>
        </div>
    )
}

export default CheckPageBlock;