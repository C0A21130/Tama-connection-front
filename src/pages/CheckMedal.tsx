import * as React from "react"
import axios, { AxiosRequestConfig } from "axios";
import { constant } from "./../constant"
import checkShop from "./../lib/checkShop";

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
        <div className="check-medal">
            <h1>メダルを確認する</h1>
            <div>
                {responseData?.checked.map((id, index) => {
                    const result = checkShop(id);
                    return result.map(() =>
                        <div key={index}>
                            <div><img src=""></img></div>
                            <div>{result[0].shopName}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CheckMedal;

