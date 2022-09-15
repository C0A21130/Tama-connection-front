import * as React from "react";
import { useNavigate } from "react-router-dom";
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

const CheckMedal: React.FC = () => {
    const navigate = useNavigate();
    const [checkedData, setCheckedData] = React.useState<Data>();
    const config: AxiosRequestConfig = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }

    React.useEffect(() => {
        axios.get<Data>(`${constant.ROOT_URL}/user`, config)
        .then((response) => {
            if (response.data.error == "exp error") {
                navigate("/account/login");
                return
            }
            setCheckedData(response.data)
        })
        .catch(() => {
            const data:Data = {
                error : "test",
                name : "username",
                checked : [],
                files: null, 
            }     
            setCheckedData(data);
        })
    },[])

    return (
        <div className="check-medal">
            <h1>メダルを確認する</h1>
            <div>
                {checkedData?.checked.map((c, index) => {
                    return <div key={index}>{c}</div>
                })}
            </div>
        </div>
    )
}

export default CheckMedal;

