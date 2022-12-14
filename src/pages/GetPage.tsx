import * as React from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { constant } from "./../constant";

import "./../static/css/page.scss"

const ROOT_URL = constant.ROOT_URL;

interface ResponsPage{
    file_name: number,
    title: string,
    tag: string,
    text: string,
    user: number,
    location: {
        x: number,
        y: number
    },
    image: string
}

const testPage: ResponsPage = {
    file_name: 1,
    title: "ネットワークエラー",
    tag: "kankou",
    text: "ネットワークと接続してください",
    user: 1,
    location: {
        x: 120,
        y: 200
    },
    image: ""
}

const GetPage: React.FC = () => {
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
                    <div className="picture">
                        <img src={page?.image}></img>
                    </div>
                </div>
            </div>
            <div className="title-block">
                <div className="title-box">
                    <div className="tag"></div>
                    <h2>{page?.title}</h2>
                </div>
            </div>
            <div className="text-blok">
                <div className="text-box">
                    <p>{page?.text}</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default GetPage;