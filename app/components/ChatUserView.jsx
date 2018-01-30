import React from 'react';

const ChatUserView = (props) => {
    const users = props.users;
    return (
        <div id="chat-user-view" className="one-third column">
            <h4>Users</h4>
            <div id="user-names">
            {users.map( (user) => {
                return (
                    <div key={user}>{user}</div>
                );
            } )}
            </div>
        </div>
    );
};

module.exports = ChatUserView;
