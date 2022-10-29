import * as React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { constant } from "./../constant";

const ROOT_URL = constant.ROOT_URL;

interface User {
    name: string,
    password: string
}

interface ResposBody {
    token: string
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
        await axios.post<ResposBody>(`${ROOT_URL}/login`, body)
        .then((response) => {
            localStorage.setItem("token", response.data.token)
            navigate("/account/success", { state: { s: true } })
        })
        .catch(() => {
            navigate("/account/signup");
        })
    }

    return (
        <div className="login">
            <h2>ログイン</h2>
            <div>
                <Link to="/account/signup"><p>アカウントを持っていない場合は<span>新規登録</span>しよう</p></Link>
            </div>
            <div className="name-input">
                <label>ユーザー名</label><input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
            </div>
            <div className="pass-input">
                <label>パスワード</label><input type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
            </div>
            <div>
                <button type="submit" onClick={() => submit_user()}>ログイン</button>
            </div>
        </div>
    )
}

export default Login;