import * as React from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { constant } from "./../constant";

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
    image: string
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
    image: ""
}

const Gaid: React.FC = () => {
    const {pageId} = useParams();
    const [page, setPage] = React.useState<ResponsPage>();

    React.useEffect(()=>{
        axios.get(`${ROOT_URL}/page/${pageId}`)
        .then((respons: AxiosResponse<ResponsPage>)=>{
            const {data} = respons;
            setPage(data)
        })
        .catch(()=>{
            setPage(testPage)
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