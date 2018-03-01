import React from 'react';
import RoomList from './RoomList.jsx';
import RoomInput from './RoomInput.jsx';

class RoomView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      rooms,
      localUser,
      selectedRoom,
      actions
    } = this.props;

    let isAdmin;
    if (selectedRoom && selectedRoom !== '') {
      isAdmin = localUser._id === rooms[selectedRoom].admin_userId;
    } else {
      isAdmin = false;
    }
    return (<div id="chat-room-view">
      <h4>Rooms</h4>
      <RoomList rooms={rooms}
        actions={actions}
        localUser={localUser}
        selectedRoom={selectedRoom}/>
      <RoomInput
        actions={this.props.actions}
        isAdmin={isAdmin}/>
    </div>);
  }

}

module.exports = RoomView;