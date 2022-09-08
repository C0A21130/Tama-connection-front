import * as React from "react";

interface PageProps {
    title: string,
    image: string,
    tag: string,
    text: string
}

const CheckPageBlock: React.FC<PageProps> = (props) => {
    const { title, image, tag, text } = props;
    let tagName;
    switch (tag) {
        case "kankou":
            tagName = "観光"; break;
        case "gurume":
            tagName = "グルメ"; break;
        case "tamasanpo":
            tagName = "たまさんぽ"; break;
        case "omiyage":
            tagName = "お土産"; break;
    }

    return (
        <div className="check-page-block">
            <p>{title}</p>
            <div><img src={image}></img></div>
            <p>タグ：{tagName}</p>
            <p>{text}</p>
        </div>
    )
}

export default CheckPageBlock;