import * as React from "react";
import { Link, Outlet } from "react-router-dom";

const Post: React.FC = () => {
    return (
        <div className="post">
            <h1>投稿</h1>
            <ul>
                <li><Link to="/post/page">写真の投稿</Link></li>
                <li>投稿された記事</li>
            </ul>
            <Outlet />
        </div>
    )
}

export default Post;