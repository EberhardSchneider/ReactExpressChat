import React, {
  Component
} from 'react';

import io from 'socket.io-client';
import guid from 'guid';

import dataHelper from '../../../helpers/DataHelpers.js';
import dataApi from '../../../store/data-api';

import UserView from './UserView.jsx';
import RoomView from './RoomView.jsx';
import MessageView from './MessageView.jsx';
import Store from '../../../store/store';


class ChatController extends Component {

  constructor(props) {
    super(props);


    // this is to show the logged in user
    // before socket.io sends list of all users async
    let {
      user
    } = this.props;
    user.roomId = '';

    this.store = new Store({
      users: {},
      rooms: {},
      messages: [],
      localUser: user
    });

    this.storeId = this.store.subscribe(this.onStoreChange.bind(this));

    this.store.addSocketEvents(user);

    this.state = this.store.getData();


    dataApi.getAndPushToStore('/rooms', this.store);

    // // socket events
    // const socket = io();
    //
    // socket.emit('add user', user);
    // socket.on('user added', (users) => {
    //   this.store.setData({
    //     socket: socket,
    //     users: users,
    //   });
    // });
    //
    // socket.on('users updated', (users) => {
    //   // delete localuser from common users object
    //   const id = this.state.localUser._id;
    //   if (users[id]) {
    //     delete users[id];
    //   }
    //
    //   if (users) {
    //     this.store.setData({
    //       users: users
    //     });
    //   }
    // });
    //
    // socket.on('user updated', (data) => {
    //   const {
    //     id,
    //     user
    //   } = data;
    //   let users = this.state.users;
    //   users[id] = user;
    //   this.store.setData({
    //     users
    //   });
    // });
    //
    // socket.on('rooms updated', (data) => {
    //   if (data) {
    //     this.store.setData({
    //       rooms: dataHelper.mapFromObject(data.rooms)
    //     });
    //   }
    // });
    //
    // socket.on('new message', (data) => {
    //   const message = data;
    //   let messages = this.state.messages;
    //   messages.push(message);
    //   this.store.setData({
    //     messages: messages
    //   });
    // });


    // callbacks for RoomInput
    this.roomViewActions = {
      selectRoom: key => {
        this.store.selectRoom(key);
      },

      addRoom: name => {
        this.store.addRoom(name);
      }
    };

    // callbacks for MessageView, MessageViewList, MessageInput
    this.messageViewActions = {
      getRoomName: () => (this.store.getRoomName()),
      getMessages: () => (this.store.getMessages()),
      emitMessage: (messageBody) => {
        this.store.emitMessage(messageBody);
      }
    };
  } // constructor

  onStoreChange(data) {
    this.setState(data);
  }

  render() {
    const View = () =>
      (<div className="container">
        <div className="four columns">
          <div>
            <UserView
              localUser={this.state.localUser}
              users={this.state.users}
              selectedRoomKey={this.state.localUser.roomId}/>
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