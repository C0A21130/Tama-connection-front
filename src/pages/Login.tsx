import * as React from "react";

const Login: React.FC = () => {
    const [name, setName] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    return (
        <div className="login">
            <h2>ログイン</h2>
            <div className="name-input">
                <label>なまえ<input type="text" value={name} onChange={(event) => setName(event.target.value)}></input></label>
            </div>
            <div className="pass-input">
                <label>ぱすわーど<input type="text" value={password} onChange={(event) => setPassword(event.target.value)}></input></label>
            </div>
        </div>
    )
}

export default Login;