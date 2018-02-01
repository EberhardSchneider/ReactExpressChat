import React from 'react';

const ChatUserView = (props) => {
  const users = props.users ?
    props.users.filter((user) => {
      return user.roomId == props.selectedRoomKey;
    }) : [];
  return (<div id="chat-user-view">
    <h4>Users</h4>
    <div id="user-names">
      {
        users.map((user) => {
          return (<div key={user.id}>{user.name}</div>);
        })
      }
    </div>
  </div>);
};

module.exports = ChatUserView;