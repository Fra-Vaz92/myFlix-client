import React from "react";
import PropTypes from "prop-types";


function UserInfo ({email, name}) {
    return (
        <>
        <h2>Account main info</h2>
        <P>User: {name}</P>
        <p>Email: {email}</p>
        
        </>
    );
};

UserInfo.prototype = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};