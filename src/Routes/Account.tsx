import * as React from "react";
import { Outlet, Link } from "react-router-dom";

const Account: React.FC = () => {

    return (
        <div className="login">
            <h1>ログイン</h1>
            <ul>
                <li>アカウントを持っている</li>
                <li>アカウントを持っていない</li>
            </ul>
            <Outlet />
        </div>
    )
}

export default Account;