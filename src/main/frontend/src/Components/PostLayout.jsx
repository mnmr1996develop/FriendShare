import React, { useState, useEffect, useContext } from "react";
import "../Resources/Styles/Components/PostLayout.css";
import {
    faComment,
    faThumbsUp,
    faTrashCan,
    faEye,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Resources/Styles/Components/singlePost.css";
import AuthContext from "../Context/AuthContext";
import PostService from "../Services/PostService";
import "../Resources/Styles/Components/PostLayout.css";
import CommentLayout from "./CommentLayout";
import { faThumbsUp as thumbSolid } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const PostLayout = ({
    postOwner,
    status,
    time,
    likes,
    postId,
    numberOfComments,
    photo,
}) => {
    let {
        contextData: { user },
    } = useContext(AuthContext);

    let navigate = useNavigate();

    const [likePost, setLikedPost] = useState(false);
    const [likeCounter, setLikeCounter] = useState(0);
    const [myPost, setMyPost] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [postComments, setPostComments] = useState([]);
    const [isMoreCommentToLoad, setIsMoreCommentToLoad] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const deletePost = () => {
        PostService.deletePost(user.sub, postId).then(() =>
            window.location.reload(false)
        );
    };

    const goToPostFull = () => {
        navigate("/post/" + postId);
    };

    const goToProfile = () => {
        navigate("/user/" + postOwner.username);
    };

    const goToPhoto = () => {
        window.location = photo;
    };

    const commentOnPost = (e) => {
        if (e.key === "Enter" && newComment.length > 1) {
            PostService.commentOnPost(user.sub, postId, newComment);
        }
    };

    const getComments = () => {
        if (numberOfComments > postComments.length) {
            PostService.getCommentsPaged(postId, pageNumber).then((res) => {
                setPostComments(postComments.concat(res.data));
                setIsMoreCommentToLoad(
                    numberOfComments > postComments.concat(res.data).length
                );
                setPageNumber(pageNumber + 1);
            });
        } else {
            setIsMoreCommentToLoad(false);
        }
    };

    useEffect(() => {
        if (postOwner.username === user.sub) {
            setMyPost(true);
        }
        if (likes) {
            setLikeCounter(likes.length);
            for (let i = 0; i < likes.length; i++) {
                if (likes[i].username === user.sub) {
                    setLikedPost(true);
                }
            }
        }
        getComments();
    }, []);

    const toggleLike = () => {
        if (likePost == false) {
            PostService.likePost(user.sub, postId).then((res) => {
                setLikedPost(true);
                setLikeCounter(res.data.likes.length);
            });
        } else {
            PostService.unLikePost(user.sub, postId).then((res) => {
                setLikedPost(false);
                setLikeCounter(res.data.likes.length);
            });
        }
    };

    const convertDate = () => {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        var t = time.split(/[-T:]/);

        var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
        var currentDateTime = new Date(Date.now());

        if (
            currentDateTime.getFullYear() - d.getFullYear() == 0 &&
            currentDateTime.getMonth() - d.getMonth() == 0 &&
            currentDateTime.getDate() - d.getDate() <= 1
        ) {
            if (currentDateTime.getDate() - d.getDate() == 1) {
                return <>yesteday</>;
            } else if (currentDateTime.getHours() - d.getHours() > 1) {
                return (
                    <>{currentDateTime.getHours() - d.getHours()} Hours Ago</>
                );
            } else if (currentDateTime.getHours() - d.getHours() == 1) {
                return (
                    <>{currentDateTime.getHours() - d.getHours()} Hour Ago</>
                );
            } else if (currentDateTime.getMinutes() - d.getMinutes() > 0) {
                return (
                    <>
                        {currentDateTime.getMinutes() - d.getMinutes()} Minutes
                        Ago
                    </>
                );
            } else {
                return <>Now</>;
            }
        } else {
            return (
                <>
                    {monthNames[d.getMonth()]} {t[2]} {d.getFullYear()}{" "}
                    {d.getHours() % 12}:{d.getMinutes()}{" "}
                    {d.getHours < 12 ? "AM" : "PM"}
                </>
            );
        }
    };

    return (
        <div className="singlePost">
            <div className="post-details">
                <div className="top-part-post">
                    <h2 onClick={goToProfile} className="goToLink">
                        {postOwner.firstName} {postOwner.lastName}
                    </h2>
                    <div className="postIcon">
                        <i onClick={goToPostFull}>
                            <FontAwesomeIcon
                                id="search-icon"
                                icon={faEye}
                                className="fa-search"
                            ></FontAwesomeIcon>
                        </i>
                        {myPost && (
                            <i onClick={deletePost}>
                                <FontAwesomeIcon
                                    id="search-icon"
                                    icon={faTrashCan}
                                    className="fa-search"
                                ></FontAwesomeIcon>
                            </i>
                        )}
                    </div>
                </div>
                <h3 className="goToLink" onClick={goToProfile}>
                    @{postOwner.username}
                </h3>
                <h6> {convertDate()}</h6>

                <p>{status}</p>
            </div>
            {photo !== null && <img src={photo} onClick={goToPhoto}></img>}
            <hr />

            <div className="post-bottom">
                <div className="post-action">
                    <h4
                        className={likePost ? "liked" : "blank"}
                        onClick={toggleLike}
                    >
                        <i>
                            <FontAwesomeIcon
                                id="search-icon"
                                icon={likePost ? thumbSolid : faThumbsUp}
                                className="fa-search"
                            ></FontAwesomeIcon>
                        </i>
                        {likeCounter} likes
                    </h4>
                </div>
                <div className="post-action">
                    <h4 onClick={goToPostFull}>
                        <i>
                            <FontAwesomeIcon
                                id="search-icon"
                                icon={faComment}
                                className="fa-search"
                            ></FontAwesomeIcon>
                        </i>
                        {numberOfComments} comments
                    </h4>
                </div>
            </div>

            <hr />

            <div className="comment-post">
                <input
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                    onKeyDown={commentOnPost}
                    placeholder="Write a Comment"
                    maxLength="250"
                ></input>
            </div>

            {postComments.map((comment) => {
                return (
                    <CommentLayout
                        commentOwner={comment.user}
                        commentText={comment.comment}
                        commentId={comment.id}
                        key={comment.id}
                        likes={comment.likes}
                        time={comment.localDateTime}
                    />
                );
            })}
            {isMoreCommentToLoad > 0 && (
                <h4 id="loadMore" onClick={getComments}>load more comments....</h4>
            )}
        </div>
    );
};

export default PostLayout;
