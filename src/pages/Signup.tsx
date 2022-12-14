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
    const [status, setStatus] = React.useState<string>("");
    const navigate = useNavigate();
    const body: User = {
        name: name,
        password: password
    }

    // ユーザーを作成してユーザーIDを保存
    const submit_user = async () =>  {
        // パスワードの文字数を確認する
        if (password.length < 8) {
            setStatus("パスワードは8桁以上にしてください");
            return 
        }

        // ユーザーを作成する
        await axios.post<ResposBody>(`${ROOT_URL}/regist`, body)
        .then((response) => {
            // 既に名前が存在する際にもう一度名前の入力を求める
            if (response.data.token == "exist name") {
                setStatus("存在する名前なので名前を変えてください");
                return
            }
            localStorage.setItem("token", response.data.token);
            navigate("/account/success", { state: { s: true } });
        })
    }

    return (
        <div className="signup">
            <h2>たまなびへようこそ!</h2>
            <h3>アカウントを作成して開始しよう</h3>
            <div>
                <Link to="/account/login"><p>アカウントを持っている場合は<span>ログイン</span>しよう</p></Link>
            </div>
            <div>
                <p>{status}</p>
            </div>
            <div className="name-input">
                <label>ユーザ名</label><input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
            </div>
            <div className="pass-input">
                <label>パスワード</label><input type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
            </div>
            <div className="submit-button">
                <button type="submit" onClick={() => submit_user()}>登録する</button>
            </div>
        </div>
    )
}

export default Signup;