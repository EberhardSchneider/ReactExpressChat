import React from 'react';
import MessageList from './MessageList.jsx';
import MessageInput from './MessageInput.jsx';

const MessageView = (props) => {

  const {
    localUser,
    actions
  } = props;

  return (
    <div id='chat-message-view' className={'two-thirds column'}>
      <h4>{actions.getRoomName()}</h4>

      <MessageList
        localUser={localUser}
        actions={actions}/>

      <MessageInput
        actions={actions}/>
    </div>);
};

module.exports = MessageView;