import * as React from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const pic_datas = require("./../pic.json");

const ROOT_URL:string = "";

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
    other: Other
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

const Page: React.FC = () => {
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
        })
    }, [])

    return(
        <div className="page">
            <h1>PAGE{pageId}</h1>
        </div>
    )
}

export default Page;