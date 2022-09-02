import * as React from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import "./../../static/css/page.scss"

const pic_datas = require("./../pic.json");

const ROOT_URL:string = "http://localhost:5000";
// const ROOT_URL = "https://tama-connection-backend.herokuapp.com";

interface Other {
    user: string,
    location_information: {
        x: number,
        y: number
    },
    good: number

}

interface ResponsPage{
    file_name: number,
    title: string,
    tag: string,
    text: string,
    other: Other | null
    image: string
}

const testPage: ResponsPage = {
    file_name: 1,
    title: "test",
    tag: "kankou",
    text: "test,test,test",
    other: {
        user: "test_user",
        location_information: {
            x: 120,
            y: 200
        },
        good: 2
    },
    image: pic_datas.file1
}

const GetPage: React.FC = () => {
    const {pageId} = useParams();
    const [pageData, setPageData] = React.useState<ResponsPage>();

    const option: AxiosRequestConfig = {
        url: `${ROOT_URL}/page/${pageId}`,
        method: "GET"
    }

    React.useEffect(()=>{
        axios(option)
        .then((respons: AxiosResponse<ResponsPage>)=>{
            const {data} = respons;
            setPageData(data)
        })
        .catch((eroor)=>{
            setPageData(testPage)
            console.log(testPage);
        })
    }, [])

    return(
        <div className="page">
        <div id={pageData?.tag}>
            <div className="picture-block">
                <div className="picture-box">
                    <div className="picture">
                        <img src={pageData?.image}></img>
                    </div>
                </div>
            </div>
            <div className="title-block">
                <div className="title-box">
                    <div className="tag"></div>
                    <h2>{pageData?.title}</h2>
                </div>
            </div>
            <div className="text-blok">
                <div className="text-box">
                    <p>{pageData?.text}</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default GetPage;