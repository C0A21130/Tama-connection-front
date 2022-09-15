import * as React from "react";
import axios, { AxiosRequestConfig } from "axios";
import {constant} from "./../constant"

interface Page {
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


interface Data {
    error: string,
    name: string,
    checked: number[],
    files: Page[] | null
}

const config: AxiosRequestConfig = {
    headers: {
        "token": localStorage.getItem("token")
    }
}

const CheckMedal: React.FC = () => {
    const [testData, setTestData] = React.useState<Data>() 
    React.useEffect(()=>{
        axios.get<Data>(`${constant.ROOT_URL}/user`, config)
        .then()
        .catch((error)=>{
            console.log(error)
            const data:Data = {
                error : "test",
                name : "username",
                checked : [5],
                files: null, 
            }     
            setTestData(data)
            console.log(testData)
        })
    },[])

    return (
        <div className="check-medal">
            <h1>メダルを確認する</h1>
            <div>
                {testData?.checked.map((c) => {
                    return <div>{c}</div>
                })}
            </div>
        </div>
    )
}

export default CheckMedal;

