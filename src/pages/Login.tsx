import * as React from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const ROOT_URL = "http://localhost:5000";
// const ROOT_URL = "https://tama-connection-backend.herokuapp.com";

interface User {
    name: string,
    password: string
}

interface ResposBody {
    user_id: number
}

const Login: React.FC = () => {
    const [name, setName] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const navigate = useNavigate();
    const body: User = {
        name: name,
        password: password
    }

    // 登録されているユーザーのIDを取得する
    const submit_user = async () => {
        const { data }: AxiosResponse<ResposBody> = await axios.post(`${ROOT_URL}/login`, body);
        await localStorage.setItem("user_id", data.user_id.toString())
        await navigate("/account/success")
    }

    return (
        <div className="login">
            <h2>ログイン</h2>
            <div className="name-input">
                <label>なまえ<input type="text" value={name} onChange={(event) => setName(event.target.value)}></input></label>
            </div>
            <div className="pass-input">
                <label>ぱすわーど<input type="text" value={password} onChange={(event) => setPassword(event.target.value)}></input></label>
            </div>
            <div>
                <button type="submit" onClick={() => submit_user()}>送信</button>
            </div>
        </div>
    )
}

export default Login;