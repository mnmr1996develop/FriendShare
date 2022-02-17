import React from "react";
import PropTypes from "prop-types";
import "../Resources/Styles/Components/PostLayout.css";

const PostLayout = ({ user, status, time }) => {
    return (
        <div className="singlePost">
            <h1>{user}</h1>
            <h6>{time}</h6>
            <p>{status}</p>
        </div>
    );
};

PostLayout.propTypes = {};

export default PostLayout;
