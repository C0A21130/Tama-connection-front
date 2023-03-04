import * as React from "react";
import { Link } from "react-router-dom";

interface PageProps {
    page: number,
    image: string,
    title: string,
    text: string
}

const PageEntty: React.FC<PageProps> = (props)=>{
    const {page, image, title, text} = props

    const reTitle = title.length > 15 ? `${title.substring(0, 14)}…` : title;
    const reText = text.length > 20 ? `${text.substring(0, 19)}…`: text

    return(
        <div className="page-entry">
            <Link to={`/gaid/${page}`}>
                <div id="image"><img width="124" height="100" alt={title} src={image} /></div>
                <div id="text">
                    <h2>{reTitle}</h2>
                    <p>{reText}</p>
                </div>
            </Link>
        </div>
    )
};

export default PageEntty;