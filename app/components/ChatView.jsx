import React, {
  Component
} from 'react';

import ChatUserView from './ChatUserView.jsx';
import ChatRoomView from './ChatRoomView.jsx';

import ChatMessageView from './ChatMessageView.jsx';

import helper from '../helpers/RestHelper.js';
import dataHelper from '../helpers/DataHelpers.js';

import guid from 'guid';

class ChatView extends Component {

  constructor(props) {
    super(props);

    const {
      users
    } = props;
    this.state = {
      users: users,
      rooms: {},
      messages: [],
      selectedRoom: ''
    };

    this.roomActions = {
      selectRoom: key => {
        if (key !== this.state.selectedRoom) {
          let {
            users
          } = this.state;
          users[this.props.socket.id].roomId = key;
          this.props.socket.emit('join room', {
            key: key
          });
          this.setState({
            selectedRoom: key
          });
        }
      },
      addRoom: name => {
        this.props.socket.emit('add room', {
          _id: guid.raw(),
          name: name
        });
      }
    };

    this.messageViewActions = {
      getRoomName: (room) => (
        (this.state.rooms && this.state.rooms[room]) ? this.state.rooms[room].name : 'Lobby'
      ),
      getMessagesForRoom: (room) => (
        dataHelper.getMessagesFromRoomKey(this.state.messages, room)
      ),
      emitMessage: (messageBody) => {
        this.props.socket.emit('new message', {
          message: messageBody
        });
      },
      getUserNameById: (id) => (
        this.state.users[id].name
      )
    };



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
      this.setState({
        users: data
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

  }




  render() {

    return (<div className="container">
      <div className="four columns">
        <div>
          <ChatUserView users={this.state.users}
            selectedRoomKey={this.state.selectedRoom}/>
        </div>
        <div>
          <ChatRoomView rooms={this.state.rooms}
            users={this.state.users}
            actions={this.roomActions}
            selectedRoom={this.state.selectedRoom}/>
        </div>

      </div>
      <div className="eight columns">
        <ChatMessageView
          actions={this.messageViewActions}
          selectedRoom={this.state.selectedRoom}/>
      </div>
    </div>);
  }
}

module.exports = ChatView;