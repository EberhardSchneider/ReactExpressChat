import React from 'react';
import ChatMessageList from './ChatMessageList.jsx';
import ChatMessageInput from './ChatMessageInput.jsx';

const ChatMessageView = (props) => {
  const {
    messages,
    selectedRoomName,
    selectedRoom,
    users,
    socket
  } = props;

  const title = selectedRoomName || 'Lobby';

  return (
    <div id='chat-message-view' className={'two-thirds column'}>
      <h4>{title}</h4>

      <ChatMessageList messages={messages}
        users={users}
        selectedRoom={selectedRoom}/>

      <ChatMessageInput socket={socket}/>
    </div>);
};

module.exports = ChatMessageView;