import React from 'react';

class ChatMessageList extends React.Component {
  render() {
    const messages = this.props.messages;
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
