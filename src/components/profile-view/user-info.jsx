import React from "react";
import PropTypes from "prop-types";


export default function UserInfo ({email, Username}) {
    return (
        <>
        <h2>Account main info</h2>
        <p>User: {Username}</p>
        <p>Email: {email}</p>
        
        </>
    );
};

UserInfo.prototype = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};