import React, {
  Component
} from 'react';

import ChatUserView from './ChatUserView.jsx';
import ChatRoomView from './ChatRoomView.jsx';

import ChatMessageView from './ChatMessageView.jsx';

import helper from '../helpers/RestHelper.js';
import dataHelper from '../helpers/DataHelpers.js';

class ChatView extends Component {

  constructor(props) {
    super(props);


    this.state = {
      users: {},
      rooms: {},
      messages: [],
      selectedRoom: '',
      joinedRoom: undefined
    };


    helper.get('/users')
      .then((data) => {
        this.setState({
          users: dataHelper.mapFromObject(data.users)
        });
      });


    helper.get('/rooms')
      .then((data) => {
        this.setState({
          rooms: dataHelper.mapFromObject(data)
        });
      })
      .catch((error) => {
        console.log('Error getting room data:' + error);
      });

    this.props.socket.on('users updated', (data) => {
      const users = data.users;
      this.setState({
        users: dataHelper.mapFromObject(users)
      });
    });

    this.props.socket.on('rooms updated', (data) => {
      this.setState({
        rooms: dataHelper.mapFromObject(data.rooms)
      });
    });

    props.socket.on('new message', (data) => {
      const message = data;
      let messages = this.state.messages;
      messages.push(message);
      this.setState({
        messages: messages
      });

    });

    this.selectRoom = this.selectRoom.bind(this);
    this.addRoom = this.addRoom.bind(this);

  }


  selectRoom(key) {
    if (key !== this.state.selectedRoom) {
      this.setState({
        selectedRoom: key
      });
      this.props.socket.emit('join room', {
        key: key
      });
    }
  }

  addRoom(name) {
    this.props.socket.emit('add room', {
      name: name
    });
  }

  render() {
    const roomName = this.state.selectedRoom ?
      this.state.rooms[this.state.selectedRoom].name :
      '';
    return (<div className="container">
      <div className="four columns">
        <div>
          <ChatUserView users={this.state.users}
            selectedRoomKey={this.state.selectedRoom}/>
        </div>
        <div>
          <ChatRoomView rooms={this.state.rooms}
            users={this.state.users}
            joinRoom={this.joinRoom}
            selectRoom={this.selectRoom}
            addRoom={this.addRoom}
            selectedRoom={this.state.selectedRoom}/>
        </div>

      </div>
      <div className="eight columns">
        <ChatMessageView messages={this.state.messages}
          selectedRoomName={roomName}
          selectedRoom={this.state.selectedRoom}
          users={this.state.users}
          socket={this.props.socket}/>
      </div>
    </div>);
  }
}

module.exports = ChatView;