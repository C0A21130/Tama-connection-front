import * as React from "react";
import { Outlet } from "react-router-dom";

import "./../static/css/account.scss"

const Account: React.FC = () => {

    return (
        <div className="account">
            <h1>たまこねくしょん<br />にログイン</h1>
            <Outlet />
        </div>
    )
}

export default Account;