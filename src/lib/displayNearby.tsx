import * as React from "react";
import { Link } from "react-router-dom";

const displayNearby = (nearbyData) => {
    return (
        nearbyData.pages?.map((page, index) => {
            return (
                <div className="page-block" key={index}>
                    <Link to={`/gaid/${page.page_id}`}>
                        <h2>{index + 1}番：{page.title}</h2>
                        <p>{page.location_name}</p>
                        <div className="pic"><img src={page.image} alt={page.title}></img></div>
                        <p>{page.text}</p>
                    </Link>
                    <button onClick={() => { window.open(`https://maps.google.co.jp/maps?ll=${page.location.x},${page.location.y}`) }}>Google MAPで開く</button>
                </div>
            )
        })
    )
}

export default displayNearby;