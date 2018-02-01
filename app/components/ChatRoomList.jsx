import React from 'react';

class ChatRoomList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }

  handleClick(key) {
    this.props.selectRoom(key);
  }

  //  TODO: differenciate ChatRoomSelector and ChatRoomList (stateless)
  render() {

    return this.props.rooms ? (<div id="room-list">
      {
        this.props.rooms.map((room) => {
          const className = (room.id == this.props.selectedRoom)
            ? 'room-list-item active'
            : 'room-list-item';
          return <div key={room.id}
            onClick={this.handleClick.bind(this, room.id)}
            className={className}>
            {room.name}
          </div>;
        })
      }
    </div>) : null;
  }
}

module.exports = ChatRoomList;