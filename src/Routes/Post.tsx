import * as React from "react";
import { Link, Outlet } from "react-router-dom";

import "./../static/css/postpage.scss";

import Camera from  "./../static/images/post/camera.svg";
import Picture from "./../static/images/post/picture.svg";

const Post: React.FC = () => {
    return (
        <div className="post">
            <h1>投稿</h1>
            <div className="post-block">
            <ul>
                <li>
                    <Link to="/post/page">
                        <div className="picture"><Camera /></div>
                        <p>写真の投稿</p>
                    </Link>
                </li>
                <li>
                    <Link to="/post/check">
                        <div className="picture"><Picture /></div>
                        <p>写真を確認</p>
                    </Link>
                </li>
            </ul>
            </div>
            <Outlet />
        </div>
    )
}

export default Post;