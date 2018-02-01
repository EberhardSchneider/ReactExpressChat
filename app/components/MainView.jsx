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

  loginNewUser(user) {

    console.log('Logging in ' + user);
    this.socket = io();

    this.socket.emit('add user', {
      name: user
    });

    this.setState({
      socket: this.socket,
      loggedIn: true
    });
  }

  render() {
    return this.state.loggedIn ?
      <ChatView socket={this.state.socket}/> :
      <LoginView loginNewUser={this.loginNewUser}/>;
  }
}

module.exports = MainView;