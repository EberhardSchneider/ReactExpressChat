import React from 'react';
import ChatInputMessage from './ChatInputMessage.jsx';
const ChatMessageView = (props) => {
    const messages = props.messages;

    return (<div id="chat-message-view" className={"two-thirds column"}>
        <h4>Messages</h4>
        {messages.map((message) => {
            return <div className="chat-message" key={message.id}>
                {message.author}: {message.body}
            </div>
        })}
        <ChatInputMessage socket={props.socket}/>
    </div>);
};

module.exports = ChatMessageView;