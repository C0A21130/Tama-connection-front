import * as React from "react";
import Icon from "./../static/images/icon.svg";

const head: React.FC = () =>{
    return(
        <div className="header">
        <header>
            <div className="header-block">
                <div className="icon"><Icon /></div>
                <h1>たまこねくしょん</h1>
            </div>
        </header>
        </div>
    )
};

export default head;