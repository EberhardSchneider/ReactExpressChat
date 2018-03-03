import React from 'react';
import helper from '../../../helpers/DataHelpers';

const UserView = (props) => {

  const {
    localUser,
    users,
    selectedRoomKey
  } = props;

  const localUserStyle = {
    color: 'red',
    fontSize: '120%',
    textTransform: 'uppercase'
  };

  const showedUsers = helper.getUsersFromRoomKey(users, selectedRoomKey);
  return (<div id="chat-user-view">
    <h4>Users</h4>
    <div id="user-names">
      <div
        className="local-user"
        style={localUserStyle}>{localUser.chatname}</div>
      { (showedUsers) ?
        showedUsers.map((user) => {
          return (<div key={user._id}>{user.chatname}</div>);
        }) : null
      }
    </div>
  </div>);
};

module.exports = UserView;