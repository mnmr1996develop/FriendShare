import React, {
    useEffect,
    useState,
    useContext,
    useRef,
    useCallback,
} from "react";
import UserService from "../Services/UserService";
import AuthContext from "../Context/AuthContext";
import "../Resources/Styles/Components/FriendScroll.css";

const FriendScroll = () => {
    const [myFriends, setMyFriends] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const ob = useRef();
    const lastFriend = useCallback(
        (node) => {
            if (loading) return;
            if (ob.current) ob.current.disconnect();
            ob.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    console.log("me");
                }
            });
            if (node) ob.current.observe(node);
        },
        [loading, hasMore]
    );

    const userCard = (friend) => {
        return (
            <div className="friend" key={friend.id}>
                <h2>@{friend.username}</h2>
                <h2>
                    {friend.firstName} {friend.lastName}
                </h2>
                <h2>birthday: {friend.birthday}</h2>
            </div>
        );
    };

    const fetchFriends = () => {
        UserService.getFriendScroll(user.sub, page).then((res) => {
            setMyFriends(myFriends.concat(res.data));
            setPage(page + 1);
            setHasMore(res.data.length > 0);
        });
    };

    let {
        contextData: { user },
    } = useContext(AuthContext);

    useEffect(() => {
        fetchFriends();
    }, []);

    return (
        <div className="Friend-scroll">
            <h1>Friends</h1>

            {myFriends.map((friend, index) => {
                if (myFriends.length === index + 1) {
                    return <div ref={lastFriend}>{friend.username}</div>;
                } else {
                    return;
                }
            })}

            {/* <InfiniteScroll
                dataLength={myFriends.length}
                next={fetchFriends}
                hasMore={hasMore}
                loader={<h2>Loading.....</h2>}
            >
                {myFriends.map((friend , index) => {
                    return (
                        <div className="friend" key={friend.id}>
                            <h2>@{friend.username}
                        
                            </h2>
                            <h2>
                                {friend.firstName} {friend.lastName}
                            </h2>
                            <h2>birthday: {friend.birthday}</h2>
                        </div>
                    );
                })}
            </InfiniteScroll> */}
        </div>
    );
};

export default FriendScroll;
