import UserService from "../Services/UserService";
import InfiniteScroll from "react-infinite-scroll-component";
import PostLayout from "./PostLayout";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import "../Resources/Styles/Components/FriendPost.css";

const FriendPost = () => {
    let {
        contextData: { user },
    } = useContext(AuthContext);

    const [post, setPost] = useState([
        {
            user: 1,
        },
    ]);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const getPost = () => {
            UserService.friendsPost(user.sub, 1).then((res) => {
                setPost(res.data);
                if (res.data.length < 25) {
                    setHasMore(false);
                }
            });
        };
        getPost();
    }, []);

    let fetchPost = () => {
        UserService.friendsPost(user.sub, page).then((res) => {
            setPost(post.concat(res.data));
            if (res.data.length == 25) {
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        });
    };

    return (
        <div className="friendsPostMain">
            <InfiniteScroll
                dataLength={post.length}
                next={fetchPost}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                {post.map((post, index) => {
                    return (
                        <PostLayout
                            id={post.id}
                            postOwner={post.user}
                            key={index}
                            status={post.status}
                            time={post.localDateTime}
                            likes={post.likes}
                        ></PostLayout>
                    );
                })}
            </InfiniteScroll>
        </div>
    );
};

export default FriendPost;
