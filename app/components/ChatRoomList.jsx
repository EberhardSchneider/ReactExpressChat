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
        Object.entries(rooms).map((entry) => {
          const id = entry[0];
          const room = entry[1];
          const className = (id == selectedRoom)
            ? 'room-list-item active'
            : 'room-list-item';
          return <div key={id}
            onClick={this.handleClick.bind(this,id)}
            className={className}>
            {room.name}
          </div>;
        })
      }
    </div>) : null;
  }
}

module.exports = ChatRoomList;