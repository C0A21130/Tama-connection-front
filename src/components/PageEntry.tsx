import * as React from "react";

interface PageProps {
    image: string
    title: string
    text: string
}

const PageEntty: React.FC<PageProps> = (props)=>{
    const {image, title, text} = props

    return(
        <div className="page-entry">
            <div id="image">{image}</div>
            <div id="text">
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
        </div>
    )
};

export default PageEntty;