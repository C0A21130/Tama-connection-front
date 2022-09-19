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

    return(
        <div className="page-entry">
            <Link to={`/gaid/${page}`}>
                <div id="image"><img alt={title} src={image} /></div>
                <div id="text">
                    <h2>{title}</h2>
                    <p>{text}</p>
                </div>
            </Link>
        </div>
    )
};

export default PageEntty;