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
              <Message author={author} body={message.body}/>
            </div>;
          }))
      }
    </div>);
  }
}

const Message = ({
  author,
  body
}) => {

  const lineStyle = {
    marginBottom: '.5em'
  };

  const authorStyle = {
    backgroundColor: '#002',
    color: 'white',
    borderRadius: '5px',
    paddingLeft: '2px'
  };

  const messageStyle = {
    color: 'black'
  };

  return (
    <div className='row' style={lineStyle}>
      <span className='two columns' style={authorStyle}>{author}</span>
      <span className='eight columns' style={messageStyle}>{body}</span>
    </div>
  );
};

module.exports = ChatMessageList;