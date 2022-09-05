import * as React from "react";
import { Outlet, Link } from "react-router-dom";

const Account: React.FC = () => {

    return (
        <div className="login">
            <h1>ログイン</h1>
            <ul>
                <li>アカウントを持っている</li>
                <li><Link to="/account/signup">アカウントを持っていない</Link></li>
            </ul>
            <Outlet />
        </div>
    )
}

export default Account;