import React from 'react';

class ChatMessageList extends React.Component {
  render() {
    const {
      actions
    } = this.props;

    return (<div id='chat-message-list'>
      {
        (actions.getMessages()
          .map((message) => {
            const author = actions.getUserNameById(message.userId);
            return <div className="chat-message" key={message._id}>
              {author}: {message.body}
            </div>;
          }))
      }
    </div>);
  }
}

module.exports = ChatMessageList;