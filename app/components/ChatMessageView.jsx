import React from 'react';
import helper from '../helpers/DataHelpers';
import ChatMessageList from './ChatMessageList.jsx';
import ChatMessageInput from './ChatMessageInput.jsx';

const ChatMessageView = (props) => {
  const {
    messages,
    selectedRoomName,
    selectedRoom,
    socket
  } = props;

  console.log('Before:');
  console.log(messages);
  const showedMessages =
    helper.getMessagesFromRoomKey(messages, selectedRoom);
  console.log('after');
  console.log(showedMessages);
  return (
    <div id='chat-message-view' className={'two-thirds column'}>
      <h4>{selectedRoomName}</h4>

      <ChatMessageList messages={showedMessages}
        selectedRoom={selectedRoom}/>

      <ChatMessageInput socket={socket}/>
    </div>);
};

module.exports = ChatMessageView;