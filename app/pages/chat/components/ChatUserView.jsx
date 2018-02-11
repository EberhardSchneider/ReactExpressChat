import React from 'react';
import helper from '../../../helpers/DataHelpers';

const ChatUserView = (props) => {

  const {
    localUser,
    users,
    selectedRoomKey
  } = props;

  const localUserStyle = {
    color: 'red',
    fontSize: '120%'
  }

  const showedUsers = helper.getUsersFromRoomKey(users, selectedRoomKey);
  return (<div id="chat-user-view">
    <h4>Users</h4>
    <div id="user-names">
      <div
        className="local-user"
        style={localUserStyle}>{localUser.name}</div>
      { (showedUsers) ?
        showedUsers.map((user) => {
          return (<div key={user._id}>{user.name}</div>);
        }) : null
      }
    </div>
  </div>);
};

module.exports = ChatUserView;