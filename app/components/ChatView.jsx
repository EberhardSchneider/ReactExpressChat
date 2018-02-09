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
      socket,
      users
    } = props;

    this.state = {
      users: users,
      rooms: {},
      messages: [],
      selectedRoom: ''
    };

    this.roomViewActions = {
      selectRoom: key => {
        if (key !== this.state.selectedRoom) {
          let {
            users
          } = this.state;
          users[socket.id].roomId = key;
          socket.emit('join room', {
            key: key
          });
          this.setState({
            selectedRoom: key
          });
        }
      },
      addRoom: name => {
        const newRoom = {
          _id: guid.raw(),
          name: name
        };
        // to the server
        socket.emit('add room', newRoom);

        // update state/gui
        let rooms = this.state.rooms;
        rooms[newRoom._id] = newRoom;
        this.setState(() => ({
          rooms: rooms
        }));

      }
    };

    this.messageViewActions = {
      getRoomName: () => (
        (this.state.rooms && this.state.rooms[this.state.selectedRoom]) ?
        this.state.rooms[this.state.selectedRoom].name :
        'Lobby'
      ),
      getMessages: () => (
        dataHelper.getMessagesFromRoomKey(this.state.messages, this.state.selectedRoom)
      ),
      emitMessage: (messageBody) => {
        socket.emit('new message', {
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

    socket.on('users updated', (data) => {
      this.setState({
        users: data
      });
    });

    socket.on('rooms updated', (data) => {
      this.setState({
        rooms: dataHelper.mapFromObject(data.rooms)
      });
    });

    socket.on('new message', (data) => {
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
            actions={this.roomViewActions}/>
        </div>

      </div>
      <div className="eight columns">
        <ChatMessageView
          actions={this.messageViewActions}/>
      </div>
    </div>);
  }
}

module.exports = ChatView;