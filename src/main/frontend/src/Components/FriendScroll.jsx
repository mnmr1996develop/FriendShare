import React, { useEffect, useState, useContext } from "react";
import UserService from "../Services/UserService";
import AuthContext from "../Context/AuthContext";
import "../Resources/Styles/Components/FriendScroll.css";

const FriendScroll = () => {
    const [myFriends, setMyFriends] = useState([]);

    let {
        contextData: { user },
    } = useContext(AuthContext);

    useEffect(() => {
        UserService.getFriends(user.sub).then((res) => {
            setMyFriends(res.data);
        });
    }, []);

    return (
        <div className="Friend-scroll">
            <h1>
                Friends <input></input>
            </h1>
            {myFriends.map((friend) => {
                return (
                    <div className="friend" key={friend.id}>
                        <h2>@{friend.username}</h2>
                        <h2>
                            {friend.firstName} {friend.lastName}
                        </h2>
                        <h2>birthday: {friend.birthday}</h2>
                    </div>
                );
            })}
        </div>
    );
};

export default FriendScroll;
