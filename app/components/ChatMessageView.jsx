import React from 'react';
import ChatMessageList from './ChatMessageList.jsx';
import ChatMessageInput from './ChatMessageInput.jsx';

const ChatMessageView = (props) => {
  const {
    selectedRoom,
    actions,
    socket
  } = props;

  const title = actions.getRoomName(selectedRoom);

  return (
    <div id='chat-message-view' className={'two-thirds column'}>
      <h4>{title}</h4>

      <ChatMessageList
        actions={actions}
        selectedRoom={selectedRoom}/>

      <ChatMessageInput
        actions={actions}/>
    </div>);
};

module.exports = ChatMessageView;