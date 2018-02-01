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
        selectRoom={this.props.selectRoom}
        selectedRoom={this.props.selectedRoom}/>
      <ChatRoomInput socket={this.props.socket}
        joinRoom={this.props.joinRoom}
        addRoom={this.props.addRoom}/>
    </div>);
  }

}

module.exports = ChatRoomView;