import * as React from "react";
import { useNavigate } from "react-router-dom";

const Eroor: React.FC = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        setTimeout(() =>{
            navigate("/");
        }, 500)
    }, [])

    return (
        <div className="Error">
            <h1>Not Found</h1>
            <p><a onClick={() => {navigate("/")}} >ホームに戻る</a></p>
        </div>
    )
}

export default Eroor;