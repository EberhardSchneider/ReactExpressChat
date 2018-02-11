import React, {
  Component
} from 'react';

import io from 'socket.io-client';
import guid from 'guid';

import restHelper from '../../../helpers/RestHelper.js';
import dataHelper from '../../../helpers/DataHelpers.js';

import ChatUserView from './ChatUserView.jsx';
import ChatRoomView from './ChatRoomView.jsx';
import ChatMessageView from './ChatMessageView.jsx';


class ChatViewController extends Component {

  constructor(props) {
    super(props);

    // this is to show the logged in user
    // before socket.io sends list of all users async
    let {
      user
    } = this.props;
    user.roomId = '';
    let users = {};
    users[this.props.user._id] = user;

    this.state = {
      users: users,
      rooms: {},
      messages: [],
      selectedRoom: '',
      localUserId: this.props.user._id
    };

    const socket = io();

    socket.emit('add user', user);

    // get roomViewActions
    restHelper.get('/rooms')
      .then((data) => {
        if (data) {
          this.setState({
            rooms: dataHelper.mapFromObject(data)
          });
        }
      })
      .catch((error) => {
        console.log('Error getting room data:' + error);
      });

    // socket events
    socket.on('user added', (users) => {
      this.setState({
        socket: socket,
        users: users,
      });
    });

    socket.on('users updated', (data) => {
      if (data) {
        this.setState({
          users: data
        });
      }
    });

    socket.on('rooms updated', (data) => {
      if (data) {
        this.setState({
          rooms: dataHelper.mapFromObject(data.rooms)
        });
      }
    });

    socket.on('new message', (data) => {
      const message = data;
      let messages = this.state.messages;
      messages.push(message);
      this.setState({
        messages: messages
      });
    });


    // callbacks for ChatRoomInput
    this.roomViewActions = {
      selectRoom: key => {
        if (key !== this.state.selectedRoom) {
          let users = this.state.users;
          users[this.state.localUserId].roomId = key;
          socket.emit('join room', {
            key: key
          });
          this.setState({
            users,
            selectedRoom: key
          });
        }
      },

      addRoom: name => {
        const newRoom = {
          _id: guid.raw(),
          name: name
        };

        socket.emit('add room', newRoom);

        // update state/gui directly
        // so we don't have to wait for the socket connection
        let rooms = this.state.rooms;
        rooms[newRoom._id] = newRoom;
        this.setState(() => ({
          rooms: rooms
        }));
      }
    };

    // callbacks for MessageView, MessageViewList, MessageInput
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
      ),
      getCurrentUserName: () => (
        this.state.users[this.state.localUserID].name
      )
    };
  } // constructor


  render() {
    const View = () =>
      (<div className="container">
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

    return (this.state.users) ? <View/> : <div>Loading...</div>;
  }
}

module.exports = ChatViewController;