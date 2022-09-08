import * as React from "react";

interface PageProps {
    title: string,
    image: string,
    tag: string,
    text: string
}

const CheckPageBlock: React.FC<PageProps> = (props) => {
    const { title, image, tag, text } = props
    return (
        <div className="check-page-block">
            <p>{title}</p>
            <div><img src={image}></img></div>
            <p>タグ：{tag}</p>
            <p>{text}</p>
        </div>
    )
}

export default CheckPageBlock;