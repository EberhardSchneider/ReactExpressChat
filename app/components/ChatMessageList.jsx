import React from 'react';

class ChatMessageList extends React.Component {
  render() {
    const {
      actions,
      selectedRoom
    } = this.props;

    console.log('Filterd');
    console.log(actions.getMessagesForRoom(selectedRoom));
    return (<div id='chat-message-list'>
      {
        (actions.getMessagesForRoom(selectedRoom)
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