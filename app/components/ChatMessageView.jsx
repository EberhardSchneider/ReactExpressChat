import React from 'react';
import ChatMessageList from './ChatMessageList.jsx';
import ChatMessageInput from './ChatMessageInput.jsx';

const ChatMessageView = (props) => {
  const messages = props.messages.filter((message) => {
    return (message.roomId === props.selectedRoom);
  });
  return (<div id='chat-message-view' className={'two-thirds column'}>
    <h4>{props.selectedRoomName}</h4>

    <ChatMessageList messages={messages}/>

    <ChatMessageInput socket={props.socket}/>
  </div>);
};

module.exports = ChatMessageView;