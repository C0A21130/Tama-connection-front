import * as React from "react";
import axios, { AxiosResponse } from "axios";

const ROOT_URL = "http://localhost:5000";
// const ROOT_URL = "https://tama-connection-backend.herokuapp.com";

interface User {
    name: string,
    password: string
}

interface ResposBody {
    user_id: number
}

const Signup: React.FC = () => {
    const [name, setName] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    // ユーザーを作成してユーザーIDを保存
    const submit_user = async () =>  {
        const body: User = {
            name: name,
            password: password
        } 

        const {data}: AxiosResponse<ResposBody> = await axios.post(`${ROOT_URL}/user`, body);

        await console.log(data.user_id)
    }

    return (
        <div className="signup">
            <h2>サインアップ</h2>
            <div className="name-input">
                <label>なまえ<input type="text" value={name} onChange={(event) => setName(event.target.value)}></input></label>
            </div>
            <div className="pass-input">
                <label>ぱすわーど<input type="text" value={password} onChange={(event) => setPassword(event.target.value)}></input></label>
            </div>
            <div className="submit-button">
                <button type="submit" onClick={() => submit_user()}>送信</button>
            </div>
        </div>
    )
}

export default Signup;