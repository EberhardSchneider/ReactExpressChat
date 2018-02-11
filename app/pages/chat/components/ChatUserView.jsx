import React from 'react';
import helper from '../../../helpers/DataHelpers';

const ChatUserView = (props) => {
  const {
    users,
    selectedRoomKey
  } = props;
  console.table({
    users,
    selectedRoomKey
  });
  const showedUsers = helper.getUsersFromRoomKey(users, selectedRoomKey);
  return (<div id="chat-user-view">
    <h4>Users</h4>
    <div id="user-names">
      { (showedUsers) ?
        showedUsers.map((user) => {
          return (<div key={user._id}>{user.name}</div>);
        }) : null
      }
    </div>
  </div>);
};

module.exports = ChatUserView;