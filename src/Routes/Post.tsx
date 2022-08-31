import * as React from "react";
import { Link, Outlet } from "react-router-dom";

const Post: React.FC = () => {
    return (
        <div className="post">
            <h1>投稿</h1>
            <div className="post-block">
            <ul>
                <li>
                    <Link to="/post/page">
                        <p>写真の投稿</p>
                    </Link>
                </li>
                <li>
                    <p>投稿された記事</p>
                </li>
            </ul>
            </div>
            <Outlet />
        </div>
    )
}

export default Post;