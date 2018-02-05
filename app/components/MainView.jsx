import React from 'react';

import io from 'socket.io-client';

import ChatView from './ChatView.jsx';
import LoginView from './LoginView.jsx';

class MainView extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      loggedIn: false
    };

    this.loginNewUser = this.loginNewUser.bind(this);
  }


  loginNewUser(userName) {

    this.socket = io();

    this.user = {
      id: this.socket.id,
      name: userName,
      roomId: ''
    };

    this.socket.emit('add user', this.user);

    this.socket.on('user added', (users) => {

      this.setState({
        socket: this.socket,
        users: users,
        loggedIn: true
      });

    });

  }

  render() {
    return this.state.loggedIn ?
      <ChatView
        socket={this.state.socket}
        users={this.state.users}/> :
      <LoginView loginNewUser={this.loginNewUser}/>;
  }
}

module.exports = MainView;