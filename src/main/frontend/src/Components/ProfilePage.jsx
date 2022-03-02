import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import PostService from "../Services/PostService";
import UserService from "../Services/UserService";
import PostLayout from "./PostLayout";
import '../Resources/Styles/Components/ProfilePage.css'

const ProfilePage = () => {
    let { username } = useParams();
    let {
        contextData: { user },
    } = useContext(AuthContext);
    const [userProfileDetails, setUserProfileDetails] = useState([]);
    const [userPost, setUserPost] = useState([]);
    const [userFriends, setUserFriends] = useState([]);
    const[isMyProfile, setIsMyProfile] = useState(false);

    useEffect(() => {
        if(username === user.sub){
            setIsMyProfile(true)
        }

        UserService.getUser(username)
            .then((res) => {
                setUserProfileDetails(res.data);
            })
            .catch(() => {});

        PostService.getUserPost(username).then((res) => {
            setUserPost(res.data);
        });

        UserService.getFriends(username).then((res) => {
            setUserFriends(res.data);
        });
    }, []);

    return (
        <div className="userProfile">
            <div className="top">
                <h1>{userProfileDetails.username} 
                    {isMyProfile ? <>yes</> : <div>no</div>}
                </h1>
                <h2>{userProfileDetails.firstName} {userProfileDetails.lastName}</h2>
                
                <h3>{userProfileDetails.birthday}</h3>
                <h3>Friends :{userFriends.length} Post: {userPost.length} </h3>
           
            </div>
            
            <div>
            {userPost.map((post) => {
                return <PostLayout
                id={post.id}
                postOwner={post.user}
                key={post.id}
                status={post.status}
                time={post.localDateTime}
                likes={post.likes}
            ></PostLayout>
            
            })}
            </div>
        </div>
    );
};

export default ProfilePage;
