import * as React from "react";


const head: React.VFC = () =>{
    return(
        <header>
            <p>アイコン
                <input type="text" placeholder="検索したいもの"></input>
                <input type="submit" value="検索"></input>
            </p>
        </header>
    )
};

export default head;