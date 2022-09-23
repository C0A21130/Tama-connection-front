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
            <h3>タイトル：{title}</h3>
            <div className="pic"><img alt={title} src={image}></img></div>
            <p>タグ：{tagName}</p>
            <p>文章：{text}</p>
        </div>
    )
}

export default CheckPageBlock;