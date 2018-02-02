import React from 'react';
import helper from '../helpers/DataHelper';
import ChatMessageList from './ChatMessageList.jsx';
import ChatMessageInput from './ChatMessageInput.jsx';

const ChatMessageView = (props) => {
  const {
    messages,
    selectedRoomName,
    selectedRoom,
    socket
  } = props;

  const showedMessages =
    helper.getMessagesFromRoomKey(messages, selectedRoom);

  return (<div id='chat-message-view' className={'two-thirds column'}>
    <h4>{selectedRoomName}</h4>

    <ChatMessageList messages={showedMessages}
      selectedRoom={selectedRoom}/>

    <ChatMessageInput socket={props.socket}/>
  </div>);
};

module.exports = ChatMessageView;