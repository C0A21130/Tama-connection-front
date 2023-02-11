import * as React from "react";
import { Link } from "react-router-dom";
import Icon from "./../static/images/icon.svg";

const head: React.FC = () =>{
    return(
        <div className="header">
        <Link to="/">
        <header>
            <div className="icon"><Icon /></div>
            <h1>たまこねくしょん</h1>
        </header>
        </Link>
        </div>
    )
};

export default head;