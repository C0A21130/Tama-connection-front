import * as React from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { constant } from "./../constant";

import Good from "./../static/images/point/good.svg";
import Go from "./../static/images/point/go.svg";
import Went from "./../static/images/point/went.svg";
import PushGood from "./../static/images/point/push_good.svg";
import PushGo from "./../static/images/point/push_go.svg";
import PushWent from "./../static/images/point/push_went.svg";

import "./../static/css/gaid.scss"

const ROOT_URL = constant.ROOT_URL;

interface ResponsPage{
    page_id: number,
    title: string,
    tag: string,
    text: string,
    user: number,
    location_name: string,
    location: {
        x: number,
        y: number
    },
    image: string,
    good: number,
    go: number,
    went: number,
    user_status: string[]
}

const testPage: ResponsPage = {
    page_id: 1,
    title: "ネットワークエラー",
    tag: "kankou",
    text: "ネットワークと接続してください",
    user: 1,
    location_name: "",
    location: {
        x: 120,
        y: 200
    },
    image: "",
    good: 0,
    go: 0,
    went: 0,
    user_status: []
}

const Gaid: React.FC = () => {
    const {pageId} = useParams();
    const [good, setGood] = React.useState(false);
    const [go, setGo] = React.useState(false);
    const [went, setWent] = React.useState(false);
    const [page, setPage] = React.useState<ResponsPage>();

    // JWTを取得する
    const isToken = () => {
        const token = localStorage.getItem("token");
        if(token == null) {
            return "null";
        }
        return token;
    }

    // いいねを押したときの関数
    const submitPoint = async (status: ("good" | "go" | "went"), isUpdate: ("post" | "put")) => {
        // JWTがないときはいいねを押せないようにする
        if (isToken() == "null") {
            return
        }

        if (isUpdate == "post") { // 追加する
            await axios.post(`${ROOT_URL}/point?page_id=${pageId}&status=${status}`, {}, {headers: {token: localStorage.getItem("token")}})
        } else if(isUpdate == "put") { // 取り消す
            await axios.put(`${ROOT_URL}/point?page_id=${pageId}&status=${status}`, {}, {headers: {token: localStorage.getItem("token")}})
        }

        // 画像を切替える
        switch(status) {
            case "good":
                setGood(good ? false : true); break;
            case "go":
                setGo(go ? false : true); break;
            case "went":
                setWent(went ? false : true); break;
        }
    }

    // 数を表示する関数
    const countPoint = (status: ("good" | "go" | "went")): number => {
        switch (status) {
            case "good":
                // 既に押していた場合
                if (page?.user_status.includes(status)) {
                    return (good ? page?.good : page?.good - 1);
                }
                return (good ? page?.good + 1 : page?.good);
            case "go":
                if (page?.user_status.includes(status)) {
                    return (go ? page?.go : page?.go -1);
                }
                return (go ? page?.go + 1 : page?.go);
            case "went":
                if (page?.user_status.includes(status)) {
                    return (went ? page?.went : page?.went - 1);
                }
                return (went ? page?.went + 1 : page?.went);
            default:
                return 0;
        }
    }

    React.useEffect(()=>{
        axios.get(`${ROOT_URL}/page/${pageId}`, {headers: {token: isToken()}})
        .then((respons: AxiosResponse<ResponsPage>)=>{
            const {data} = respons;
            setPage(data);
            data.user_status.map((status) => {
                switch(status) {
                    case "good":
                        setGood(true); break;
                    case "go":
                        setGo(true); break;
                    case "went":
                        setWent(true); break
                }
            });
        })
        .catch(()=>{
            setPage(testPage);
        })
    }, [])

    return(
        <div className="page">
        <div id={page?.tag}>
            <div className="picture-block">
                <div className="picture-box">
                    <img src={page?.image}></img>
                </div>
            </div>
            <div className="text-box">
                <div className="title-block">
                    <div className="tag"></div>
                    <h2>{page?.title}</h2>
                </div>
                <div className="point-block">
                    <div className="good" onClick={() => {submitPoint("good", good ? "put": "post")}}>
                        <div className="img">{good ? <PushGood />: <Good />}</div>
                        <p>{countPoint("good")}件のいいね</p>
                    </div>
                    <div className="go" onClick={() => {submitPoint("go", go ? "put" : "post")}}>
                        <div className="img">{go ? <PushGo /> : <Go />}</div>
                        <p>{countPoint("go")}人が行きたいと思いました</p>
                    </div>
                        <div className="went" onClick={() => {submitPoint("went", went ? "put" : "post")}}>
                        <div className="img">{went ? <PushWent /> : <Went />}</div>
                        <p>{countPoint("went")}人が行ったことがあります</p>
                    </div>
                </div>
                <div className="location-name-block" style={{ display: !page?.location_name || page?.location_name == "" ? "none" : "block" }}>
                    <p>撮影場所：{page?.location_name}</p>
                </div>
                <div className="text-block">
                    <p>{page?.text}</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Gaid;