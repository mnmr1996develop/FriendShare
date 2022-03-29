import React, { useEffect, useState } from "react";
import PostComponent from "../Components/PostComponent";
import "../Resources/Styles/Pages/Home.css";
import FriendPost from "../Components/FriendPost";
import FriendScroll from "../Components/FriendScroll";
import NewsComponent from "../Components/NewsComponent";
import axios from "axios";

function Home() {
    // const [newsArticles1, setNewsArticles1] = useState([]);
   

    // useEffect(() => {
    //     axios
    //         .get("https://inshortsapi.vercel.app/news?category=technology")
    //         .then((res) => {
    //             const half = Math.ceil(res.data.data.length / 2);
    //             setNewsArticles1(res.data.data.splice(0, half));
                
    //         });
    // }, []);

    return (
        <div className="Home">
            <div className="Home-row">
                <div className="Home-space">
                    {/* <NewsComponent newsArticles={newsArticles1}/> */}
                </div>
                <div className="Home-main">
                    <PostComponent />
                    <FriendPost />
                </div>
                <div className="Home-freinds">
                    {/* <NewsComponent newsArticles={newsArticles1} /> */}
                </div>
            </div>
        </div>
    );
}

export default Home;
