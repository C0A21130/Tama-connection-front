import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import CheckPageBlock from "../components/CheckPageBlock";

const ROOT_URL = "http://localhost:5000";
// const ROOT_URL = "https://tama-connection-backend.herokuapp.com";

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
                if (response.data.error == "exp error") {
                    navigate("/account/login")
                    return 
                } else {
                    setFiles(response.data.files)
                }
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