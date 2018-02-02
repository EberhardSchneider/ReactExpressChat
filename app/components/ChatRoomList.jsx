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
    const {
      rooms,
      selectedRoom
    } = this.props;

    return rooms ? (<div id="room-list">
      {
        // TODO: get selected room from object
        Object.values(rooms).map((room) => {
          const className = (room.id == selectedRoom)
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