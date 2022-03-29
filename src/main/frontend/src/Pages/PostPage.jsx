import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../Services/PostService";
import "../Resources/Styles/Pages/PostPage.css";
import CommentLayout from "../Components/CommentLayout";
import AuthContext from "../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as thumbSolid } from "@fortawesome/free-solid-svg-icons";

const PostPage = () => {
    let { postId } = useParams();
    const [post, setPost] = useState([]);
    const [show, setShow] = useState(false);
    const [postComments, setPostComments] = useState([]);
    const [likePost, setLikedPost] = useState(false);
    const [likeCounter, setLikeCounter] = useState(0);
    const [newComment, setNewComment] = useState("");

    let {
        contextData: { user },
    } = useContext(AuthContext);

    let navigate = useNavigate();

    const goToProfile = () => {
        navigate("/user/" + post.user.username);
    };

    const goToPhoto = () => {
        window.location = post.photo;
    };

    const commentOnPost = (e) => {
        if (e.key === "Enter" && newComment.length > 1) {
            PostService.commentOnPost(user.sub, postId, newComment);
        }
    };


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
        var t = post.localDateTime.split(/[-T:]/);

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

    useEffect(() => {
        PostService.getPostByID(postId)
            .then((res) => {
                let post = res.data;
                setPost(post);
                if (post.likes) {
                    setLikeCounter(post.likes.length);
                    for (let i = 0; i < post.likes.length; i++) {
                        if (post.likes[i].username === user.sub) {
                            setLikedPost(true);
                        }
                    }
                }
            })
            .then(
                PostService.getAllComments(postId).then((res) =>
                    setPostComments(res.data)
                )
            )
            .then(() => setShow(true))
            .catch(() => {
                navigate("/ErrorPage");
            });
    }, []);

    return (
        <>
            {show && (
                <div className="PostPage">
                    <div className="space" />
                    <div className="mainPost">
                        <div>
                            <h1 onClick={goToProfile}>
                                {post.user.firstName} {post.user.lastName}
                            </h1>
                            <h2 onClick={goToProfile}>@{post.user.username}</h2>
                        </div>
                        <div>
                            <h3>{convertDate()}</h3>
                        </div>

                        <p>{post.status}</p>
                        {post.photo !== null && (
                            <img src={post.photo} onClick={goToPhoto}></img>
                        )}

                        <div>
                            <hr className="hr" />
                            <div className="post-bottom">
                                <div className="post-action">
                                    <h4
                                        className={likePost ? "liked" : "blank"}
                                        onClick={toggleLike}
                                    >
                                        <i>
                                            <FontAwesomeIcon
                                                id="search-icon"
                                                icon={
                                                    likePost
                                                        ? thumbSolid
                                                        : faThumbsUp
                                                }
                                                className="fa-search"
                                            ></FontAwesomeIcon>
                                        </i>
                                        {likeCounter} likes
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
                                        {postComments.length} comments
                                    </h4>
                                </div>
                            </div>
                            <hr className="hr" />
                            <div className="comment-post">
                                <input
                                    onChange={(e) =>
                                        setNewComment(e.target.value)
                                    }
                                    value={newComment}
                                    onKeyDown={commentOnPost}
                                    placeholder="Write a Comment"
                                    maxLength="250"
                                ></input>
                            </div>

                            <div className="postComments">
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
                            </div>
                        </div>
                    </div>
                    <div className="space" />
                </div>
            )}
        </>
    );
};

export default PostPage;
