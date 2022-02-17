import React from "react";
import PostComponent from "../Components/PostComponent";
import "../Resources/Styles/Pages/Home.css";
import FriendPost from "../Components/FriendPost";
import FriendScroll from "../Components/FriendScroll";

function Home() {
    return (
        <div className="Home">
            <div className="Home-row">
                <div className="Home-main">
                    <PostComponent />
                    <FriendPost />
                </div>
                <div className="Home-freinds">
                    <FriendScroll />
                </div>
            </div>
        </div>
    );
}

export default Home;
