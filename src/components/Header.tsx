import * as React from "react";

import User from "../../static/images/user.svg"

const head: React.FC = () =>{
    return(
        <div className="header">
        <header>
            <div className="header-block">
                <p className="icon"><User /></p>
                <input type="text" className="window" placeholder="検索したいもの"/>
                <input type="submit" value="検索"/>
            </div>
        </header>
        </div>
    )
};

export default head;