import * as React from "react";
import axios, { AxiosResponse } from "axios";
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

const Signup: React.FC = () => {
    const [name, setName] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("名前とパスワードを入力してね");
    const navigate = useNavigate();
    const body: User = {
        name: name,
        password: password
    }

    // ユーザーを作成してユーザーIDを保存
    const submit_user = async () =>  {
        // パスワードの文字数を確認する
        if (password.length <= 8) {
            setStatus("パスワードは8桁以上にしてください");
            return 
        }

        // ユーザーを作成する
        // const {data}: AxiosResponse<ResposBody> = await axios.post(`${ROOT_URL}/regist`, body);
        await axios.post<ResposBody>(`${ROOT_URL}/regist`, body)
        .then((response) => {
            if (response.data.token == "exist name") {
                setStatus("存在する名前なので名前を変えてください");
                return
            }
            localStorage.setItem("token", response.data.token);
            navigate("/", { state: { s: true } });
        })
    }

    return (
        <div className="signup">
            <h2>サインアップ</h2>
            <div>
                <Link to="/account/login"><p>アカウントを持っている</p></Link>
            </div>
            <div>
                <p>{status}</p>
            </div>
            <div className="name-input">
                <label>名前</label><input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
            </div>
            <div className="pass-input">
                <label>パスワード</label><input type="text" value={password} onChange={(event) => setPassword(event.target.value)}></input>
            </div>
            <div className="submit-button">
                <button type="submit" onClick={() => submit_user()}>送信</button>
            </div>
        </div>
    )
}

export default Signup;