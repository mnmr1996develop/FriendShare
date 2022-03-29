import UserService from "../Services/UserService";
import InfiniteScroll from "react-infinite-scroll-component";
import PostLayout from "./PostLayout";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import "../Resources/Styles/Components/FriendPost.css";
import axios from "axios";
import noPost from '../Resources/Images/noPost.jpg'

const FriendPost = () => {
    let {
        contextData: { user },
    } = useContext(AuthContext);

    const [post, setPost] = useState([]);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [noUserPost, setNoUserPost] = useState(false)
   

    let fetchPost = () => {
        UserService.friendsPost(user.sub, page).then((res) => {
            setPost(post.concat(res.data));
            setPage(page + 1);
            if (res.data.length < 10) {
                setHasMore(false);
            }
        });
    };

    useEffect(() => {
        UserService.friendsPost(user.sub, 1).then((res) => {
            
            setPost(res.data);
            if(res.data.length == 0){
                setNoUserPost(true)
            }
            setHasMore(res.data.length > 0);
        });

    
    }, []);

    return (

        <div className="FriendPost">
            {noUserPost && (
                <div>
                    <img src={noPost}/>
                </div>
                )}
            <InfiniteScroll
                dataLength={post.length}
                next={fetchPost}
                hasMore={hasMore}
                loader={<h2>Loading.....</h2>}
            >
                {post.map((post) => {
                    return (
                        <PostLayout
                            postId={post.id}
                            postOwner={post.user}
                            key={post.id}
                            status={post.status}
                            time={post.localDateTime}
                            likes={post.likes}
                            numberOfComments={post.numberOfComments}
                            photo={post.imageLink}
                        />
                    );
                })}
            </InfiniteScroll>
        </div>
    );
};

export default FriendPost;
