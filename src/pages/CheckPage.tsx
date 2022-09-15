import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import CheckPageBlock from "../components/CheckPageBlock";
import { constant } from "./../constant";

const ROOT_URL = constant.ROOT_URL;

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
    files: Page[]
}

const CheckPage: React.FC = () => {
    const [files, setFiles] = React.useState<Page[]>()
    const navigate = useNavigate();

    // ヘッダーにJWTを設定
    const config: AxiosRequestConfig = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }

    React.useEffect(() => {
        axios.get<Data>(`${ROOT_URL}/user`, config)
        .then((response) => {
            // 期限切れのときにログインページに移動する
            if (response.data.error == "exp error") {
                navigate("/account/login")
                return 
            }
            setFiles(response.data.files.reverse())
        })
        .catch(()=>{
            setFiles([])
        })
    }, [])

    return (
        <div className="check-page">
            {files?.map((file, index) => 
                <CheckPageBlock title={file.title} image={file.image} tag={file.tag} text={file.text} key={index} />
            )}
        </div>
    )
}

export default CheckPage;