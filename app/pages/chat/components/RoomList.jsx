import React from 'react';

class RoomList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }

  handleClick(key) {
    this.props.actions.selectRoom(key);
  }

  //  TODO: differenciate ChatRoomSelector and RoomList (stateless)
  render() {
    const {
      rooms,
      localUser,
      selectedRoom
    } = this.props;

    return rooms ? (<div id="room-list">
      {
        Object.entries(rooms).map((entry) => {
          const id = entry[0];
          const room = entry[1];
          const className = (id == selectedRoom)
            ? 'room-list-item active'
            : 'room-list-item';
          const roomName = (localUser._id === room.admin_userId)
            ? room.name + ' (Admin)' : room.name;
          return <div key={id}
            onClick={this.handleClick.bind(this,id)}
            className={className}>
            {roomName}
          </div>;
        })
      }
    </div>) : <div>No room created yet.</div>;
  }
}

module.exports = RoomList;