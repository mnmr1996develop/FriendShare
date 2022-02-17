import React, { useEffect, useState, useContext } from "react";
import UserService from "../Services/UserService";
import AuthContext from "../Context/AuthContext";

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
        <>
            <h1>My Friends</h1>
            {myFriends.map((friend) => {
                return (
                    <div>
                        <h1>username: {friend.username}</h1>
                        <h2>
                            name: {friend.firstName} {friend.lastName}
                        </h2>
                        <h2>birthday: {friend.birthday}</h2>
                        <br />
                        <br />
                    </div>
                );
            })}
        </>
    );
};

export default FriendScroll;
