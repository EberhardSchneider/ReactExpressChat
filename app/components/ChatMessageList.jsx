import React from 'react';
import helper from '../helpers/DataHelper';

class ChatMessageList extends React.Component {
  render() {
    const {
      messages,
      selectedRoom
    } = this.props;


    return (<div id='chat-message-list'>
      {
        (messages.map((message) => {
          return <div className="chat-message" key={message.id}>
            {message.author}: {message.body}
          </div>;
        }))
      }
    </div>);
  }
}

module.exports = ChatMessageList;