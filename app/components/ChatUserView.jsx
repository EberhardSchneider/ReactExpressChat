import React from 'react';
import helper from '../helpers/DataHelper';

const ChatUserView = (props) => {
  const {
    users,
    selectedRoomKey
  } = props;
  console.log({
    users,
    selectedRoomKey
  });
  const showedUsers = helper.getUsersFromRoomKey(props.users, props.selectedRoomKey);
  return (<div id="chat-user-view">
    <h4>Users</h4>
    <div id="user-names">
      {
        showedUsers.map((user) => {
          return (<div key={user.id}>{user.name}</div>);
        })
      }
    </div>
  </div>);
};

module.exports = ChatUserView;