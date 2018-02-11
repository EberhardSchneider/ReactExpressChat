import React from 'react';
import ChatRoomList from './ChatRoomList.jsx';
import ChatRoomInput from './ChatRoomInput.jsx';

class ChatRoomView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div id="chat-room-view">
      <h4>Rooms</h4>
      <ChatRoomList rooms={this.props.rooms}
        actions={this.props.actions}
        selectedRoom={this.props.selectedRoom}/>
      <ChatRoomInput
        actions={this.props.actions}/>
    </div>);
  }

}

module.exports = ChatRoomView;