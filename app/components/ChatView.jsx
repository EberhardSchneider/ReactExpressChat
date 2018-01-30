import React, {Component} from 'react';

import ChatUserView from './ChatUserView.jsx';
import ChatMessageView from './ChatMessageView.jsx';
import guid from 'guid';

class ChatView extends Component {



    constructor(props) {
        super(props);

        this.messages = [
            { id:'a',author: 'Ebi', body: 'Whats Up?'}
        ];

        this.state = { users: [],
                        messages: this.messages };

        this.props.socket.on('users updated', (data) => {
            const users = Object.values(data.users);
            console.log( users );
            this.setState({users: users});
        });


        props.socket.on('new message', (data) => {
            const message = { id: guid.raw(),
                                author: data.user,
                                body: data.message };
            let messages = this.state.messages;
            messages.push( message );
            this.setState({messages: messages});

        })
    }
;
    render() {

        return (
            <div className="container">
                <div className='row bottom'>
                    <ChatUserView users={this.state.users}/>
                    <ChatMessageView messages={this.state.messages} socket={this.props.socket}/>
                </div>
            </div>
        );
    }
}

module.exports = ChatView;