import React from 'react';
import ChatMessageList from './ChatMessageList.jsx';
import ChatMessageInput from './ChatMessageInput.jsx';

const ChatMessageView = (props) => {

  const {
    localUser,
    actions
  } = props;

  return (
    <div id='chat-message-view' className={'two-thirds column'}>
      <h4>{actions.getRoomName()}</h4>

      <ChatMessageList
        localUser={localUser}
        actions={actions}/>

      <ChatMessageInput
        actions={actions}/>
    </div>);
};

module.exports = ChatMessageView;