import * as React from "react"
import axios, { AxiosRequestConfig } from "axios";
import { constant } from "./../constant"
import checkShop from "./../lib/checkShop";

import Medal from "./../static/images/library/medal.svg";

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
    name: string,
    checked: number[],
    files: Page[] | null
}

const CheckMedal: React.FC = () => {
    const [responseData, setResponseData] = React.useState<Data>();
    const config: AxiosRequestConfig = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }

    // 取得したメダルを表示する
    React.useEffect(() => {
        axios.get<Data>(`${constant.ROOT_URL}/user`, config)
        .then((response) => {
            setResponseData(response.data);
        })
        .catch(() => {
            const testData:Data = {
                name : "username",
                checked : [],
                files: null, 
            }     
            setResponseData(testData);
        })
    },[])

    return (
        <div className="medal-block">
            <h2>メダルを確認する</h2>
            <div className="display-medal-block">
                {responseData?.checked.map((id, index) => {
                    const result = checkShop(id);
                    return result.map(() =>
                        <div key={index} className="medal-box">
                            <div className="medal"><Medal /></div>
                            <div className="text-block">
                                <p>{result[0].shopName}</p>
                                <p>お店の説明</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CheckMedal;

