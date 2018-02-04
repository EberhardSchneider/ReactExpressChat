import React from 'react';
import helper from '../helpers/DataHelpers';

class ChatMessageList extends React.Component {
  render() {
    const {
      messages,
      users,
      selectedRoom
    } = this.props;

    const showedMessages =
      helper.getMessagesFromRoomKey(messages, selectedRoom);

    return (<div id='chat-message-list'>
      {
        (showedMessages.map((message) => {
          return <div className="chat-message" key={message._id}>
            {users[message.userId].name}: {message.body}
          </div>;
        }))
      }
    </div>);
  }
}

module.exports = ChatMessageList;