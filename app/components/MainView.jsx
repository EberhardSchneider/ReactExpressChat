import React from 'react';

import io from 'socket.io-client';

import ChatView from './ChatView.jsx';
import LoginView from './LoginView.jsx';

class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false, users: [] };

        this.loginNewUser = this.loginNewUser.bind(this);
    }

    loginNewUser( user ) {
        this.socket = io();

            this.setState({socket: this.socket});


        this.socket.emit('add user', { name: user });

        this.setState({ loggedIn: true});
    }

    render() {
        return this.state.loggedIn ? <ChatView socket={this.state.socket}/> : <LoginView loginNewUser={this.loginNewUser}/>;
    }
}

module.exports = MainView;