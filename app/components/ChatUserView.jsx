import React from 'react';
import helper from '../helpers/DataHelpers';

const ChatUserView = (props) => {
  const {
    users,
    selectedRoomKey
  } = props;

  const showedUsers = helper.getUsersFromRoomKey(users, selectedRoomKey);
  console.log('Filtered Users:');
  console.log(showedUsers);
  return (<div id="chat-user-view">
    <h4>Users</h4>
    <div id="user-names">
      { (showedUsers) ?
        showedUsers.map((user) => {
          return (<div key={user.id}>{user.name}</div>);
        }) : null
      }
    </div>
  </div>);
};

module.exports = ChatUserView;