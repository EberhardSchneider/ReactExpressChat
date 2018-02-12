import React, {
  Component
} from 'react';

import io from 'socket.io-client';
import guid from 'guid';

import restHelper from '../../../helpers/RestHelper.js';
import dataHelper from '../../../helpers/DataHelpers.js';

import UserView from './UserView.jsx';
import RoomView from './RoomView.jsx';
import MessageView from './MessageView.jsx';


class ChatController extends Component {

  constructor(props) {
    super(props);

    // this is to show the logged in user
    // before socket.io sends list of all users async
    let {
      user
    } = this.props;
    user.roomId = '';

    this.state = {
      users: {},
      rooms: {},
      messages: [],
      selectedRoom: '',
      localUser: user
    };



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
    const socket = io();

    socket.emit('add user', user);
    socket.on('user added', (users) => {
      this.setState({
        socket: socket,
        users: users,
      });
    });

    socket.on('users updated', (users) => {
      // delete localuser from common users object
      const id = this.state.localUser._id;
      if (users[id]) {
        delete users[id];
      }

      if (users) {
        this.setState({
          users: users
        });
      }
    });

    socket.on('user updated', (data) => {
      const {
        id,
        user
      } = data;
      let users = this.state.users;
      users[id] = user;
      this.setState({
        users
      });
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


    // callbacks for RoomInput
    this.roomViewActions = {
      selectRoom: key => {
        if (key !== this.state.selectedRoom) {
          let users = this.state.users;
          this.state.localUser.roomId = key;
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
      getRoomName: () => (this.state.rooms &&
        this.state.rooms[this.state.selectedRoom] ?
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
        this.state.localUser.name
      )
    };
  } // constructor


  render() {
    const View = () =>
      (<div className="container">
        <div className="four columns">
          <div>
            <UserView
              localUser={this.state.localUser}
              users={this.state.users}
              selectedRoomKey={this.state.selectedRoom}/>
          </div>
          <div>
            <RoomView rooms={this.state.rooms}
              users={this.state.users}
              actions={this.roomViewActions}/>
          </div>

        </div>
        <div className="eight columns">
          <MessageView
            localUser={this.state.localUser}
            actions={this.messageViewActions}/>
        </div>
      </div>);

    return (this.state.users) ? <View/> : <div>Loading...</div>;
  }
}

module.exports = ChatController;