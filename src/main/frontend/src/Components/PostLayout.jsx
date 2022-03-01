import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "../Resources/Styles/Components/PostLayout.css";
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Resources/Styles/Components/singlePost.css";
import AuthContext from "../Context/AuthContext";
import UserService from "../Services/UserService";
import PostService from "../Services/PostService";
import "../Resources/Styles/Components/PostLayout.css";

const PostLayout = ({ postOwner, status, time, likes, id }) => {
    var date;
    var postDate;
    var longAgo;

    let {
        contextData: { user },
    } = useContext(AuthContext);

    const [likePost, setLikedPost] = useState(false);
    const [likeCounter, setLikeCounter] = useState(0);

    // useEffect(() => {
    //     date = new Date();
    //     postDate = new Date(time);
    //     longAgo = Math.abs(date - postDate) / 1000 / 60;

    // });

    useEffect(() => {
        if (likes) {
            setLikeCounter(likes.length);
            for (let i = 0; i < likes.length; i++) {
                if (likes[i].username == user.sub) {
                    setLikedPost(true);
                }
            }
        }
    },[]);

    const toggleLike = () => {
        if (likePost == false) {
            PostService.likePost(user.sub, id).then((res) => {
                setLikedPost(true);
                setLikeCounter(res.data.likes.length)
            });
        } else {
            PostService.unLikePost(user.sub, id).then((res) => {
                setLikedPost(false);
                setLikeCounter(res.data.likes.length);
            });
        }
    };

    return (
        <div className="singlePost">
            <div className="post-details">
                <h2>
                    {postOwner.firstName} {postOwner.lastName}
                </h2>
                <h3>@{postOwner.username}</h3>
                <h6> {time}</h6>
                
                <p>{status}</p>
            </div>
            <div className="post-bottom">
                <div className="post-action">
                    <h4
                        className={likePost ? "liked" : "blank"}
                        onClick={toggleLike}
                    >
                        <i>
                            <FontAwesomeIcon
                                id="search-icon"
                                icon={faThumbsUp}
                                className="fa-search"
                            ></FontAwesomeIcon>
                        </i>
                        likes {likeCounter}
                    </h4>
                </div>
                <div className="post-action">
                    <h4>
                        <i>
                            <FontAwesomeIcon
                                id="search-icon"
                                icon={faComment}
                                className="fa-search"
                            ></FontAwesomeIcon>
                        </i>
                        comment
                    </h4>
                </div>
            </div>
        </div>
    );
};

PostLayout.propTypes = {};

export default PostLayout;
