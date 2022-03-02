import React, { useContext, useEffect, useState } from "react";
import FriendFound from "../Components/FriendFound";
import AuthContext from "../Context/AuthContext";
import UserService from "../Services/UserService";

const Friends = () => {
    const [search, setSearch] = useState("");
    const [usersFound, setUsersFound] = useState([]);

    const [myFriends, setMyFriends] = useState(new Set());
    const [myFriendRequest, setMyFriendRequest] = useState(new Set());
    const [mySentFriendRequest, setMySentFriendRequest] = useState(new Set());

    let {
        contextData: { user },
    } = useContext(AuthContext);

    var getSearchRequest = (e) => {
        e.preventDefault();
        UserService.userSearch(search).then((res) => {
            setUsersFound(res.data);
        });
    };

    useEffect(() => {
        UserService.getFriends(user.sub).then((res) => {
            res.data.forEach((item) => {
                setMyFriends((prev) => new Set([...prev, item.username]));
            });
        });

        UserService.getMySentFriendRequest(user.sub).then((res) => {
            res.data.forEach((item) => {
                setMySentFriendRequest(
                    (prev) => new Set([...prev, item.username])
                );
            });
        });

        UserService.myFriendRequest(user.sub).then((res) => {
            res.data.forEach((item) => {
                setMyFriendRequest((prev) => new Set([...prev, item.username]));
            });
        });
    }, []);

    return (
        <div className="Friends">
            <div id="findFriends">
                <form onSubmit={getSearchRequest}>
                    <input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value.trim());
                        }}
                        placeholder="search Username"
                        required
                    ></input>
                    <input type="submit"></input>
                </form>
                {usersFound
                    .filter((item) => {
                        return user.sub === item.username ? false : true;
                    })
                    .map((userFound) => {
                        if (myFriends.has(userFound.username)) {
                            return <div key={userFound.id}> {userFound.username} go to profile</div>;
                        }

                        if (myFriendRequest.has(userFound.username)) {
                            return <div  key={userFound.id}> my request </div>;
                        }

                        if (mySentFriendRequest.has(userFound.username)) {
                            return (
                                <FriendFound 
                                key={userFound.id}
                                userFound={userFound}
                                sentRequest={true}
                                    />
                            )
                        }
                        return (
                            <FriendFound
                                key={userFound.id}
                                userFound={userFound}
                            />
                        );
                    })}
            </div>
            <div id="FriendsMyFriends"></div>
        </div>
    );
};

export default Friends;
