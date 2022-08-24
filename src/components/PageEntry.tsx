import * as React from "react";
import { NavLink } from "react-router-dom";

interface PageProps {
    page: number,
    image: string,
    title: string,
    text: string
}

const PageEntty: React.FC<PageProps> = (props)=>{
    const {page, image, title, text} = props

    return(
        <div className="page-entry">
            <div id="image"><img src={image} /></div>
            <div id="text">
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
        </div>
    )
};

export default PageEntty;