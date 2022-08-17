import * as React from "react";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

const ROOT_URL = "https://"


const options: AxiosRequestConfig = {
    url: `${ROOT_URL}/page`,
    method: "GET" 
}

const Home: React.VFC = ()=>{
    const [pages, setPaages] = React.useState();

    React.useEffect(() => {
        async ()=>{
            await axios(options)
            .then((respons: AxiosResponse) => {
                setPaages(respons.data)
            })
        }
    }, [])

    return(
        <div id="Home">
            <h1>Home{pages}</h1>
        </div>
    )
}

export default Home