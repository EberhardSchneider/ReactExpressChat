import React from 'react';

class RoomInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomInputActive: false,
      newRoomInput: ''
    };

    this.handleAddRoomClicked = this.handleAddRoomClicked.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleAddRoomClicked() {
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
    this.props.actions.addRoom(this.state.newRoomInput);

    this.setState({
      roomInputActive: false,
      newRoomInput: ''
    });
  }

  handleBackToLobbyClicked = () => {
    this.props.actions.selectRoom('');
  }

  deleteRoom = () => {
    this.props.actions.deleteRoom();
  }

  render() {

    const {
      actions,
      isAdmin
    } = this.props;


    return (<div className="chat-room-input row">

      <button className="u-full-width"
        onClick={this.handleAddRoomClicked}>New Room</button>

      {
        this.state.roomInputActive
          ? <form onSubmit={this.handleSubmit}>

            <input type="text"
              className="u-full-width"
              value={this.state.newRoomInput}
              onChange={this.handleInputChange}
              autoFocus={true}/>

          </form>
          : null
      }
      {
        isAdmin
          ? <button
            className="u-full-width"
            onClick={this.deleteRoom}>Delete Room</button> : null
      }
      {
        !actions.isLobby() ? <button
          className="u-full-width"
          onClick={this.handleBackToLobbyClicked}>Back To Lobby</button>
          : null
      }
    </div>);
  }
}

module.exports = RoomInput;