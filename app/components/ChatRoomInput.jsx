import React from 'react';

class ChatRoomInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomInputActive: false,
      newRoomInput: ''
    };

    this.handleJoinRoom = this.handleJoinRoom.bind(this);
    this.handleAddRoom = this.handleAddRoom.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleJoinRoom() {
    this.props.joinRoom();
  }

  handleAddRoom() {
    this.setState((prevState) => {
      return {
        roomInputActive: !prevState.roomInputActive
      };
    });
  }

  handleInputChange(e) {
    this.setState({
      newRoomInput: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addRoom(this.state.newRoomInput);
    this.setState({
      roomInputActive: false,
      newRoomInput: ''
    });
  }

  render() {
    return (<div className="chat-room-input row">
      <button className="u-full-width"
        onClick={this.handleJoinRoom}>Join Room</button>

      <button className="u-full-width"
        onClick={this.handleAddRoom}>New Room</button>

      { this.state.roomInputActive ? <form onSubmit={this.handleSubmit}>
        <input type="text"
          className="u-full-width"
          value={this.state.newRoomInput}
          onChange={this.handleInputChange}
          autoFocus={true}/>
      </form> : null }
    </div>);
  }
}

module.exports = ChatRoomInput;