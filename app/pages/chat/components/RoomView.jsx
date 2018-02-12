import React from 'react';
import RoomList from './RoomList.jsx';
import RoomInput from './RoomInput.jsx';

class RoomView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div id="chat-room-view">
      <h4>Rooms</h4>
      <RoomList rooms={this.props.rooms}
        actions={this.props.actions}
        selectedRoom={this.props.selectedRoom}/>
      <RoomInput
        actions={this.props.actions}/>
    </div>);
  }

}

module.exports = RoomView;