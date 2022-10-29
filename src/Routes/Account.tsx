import * as React from "react";
import { Outlet } from "react-router-dom";

import "./../static/css/account.scss"

const Account: React.FC = () => {

    return (
        <div className="account">
            <Outlet />
        </div>
    )
}

export default Account;