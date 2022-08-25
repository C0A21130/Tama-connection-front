import * as React from "react";
import { useParams } from "react-router-dom";

const Page: React.FC = () => {
    const pageId = useParams()

    console.log(pageId)

    return(
        <h1>PAGE</h1>
    )
}

export default Page;