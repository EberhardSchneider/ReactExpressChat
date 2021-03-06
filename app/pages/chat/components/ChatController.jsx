import React, {
  Component
} from 'react';


import UserView from './UserView.jsx';
import RoomView from './RoomView.jsx';
import MessageView from './MessageView.jsx';


class ChatController extends Component {

  constructor(props) {
    super(props);


    // this is to show the logged in user
    // before socket.io sends list of all users async
    let {
      user
    } = this.props;
    user.roomId = '';

    this.store = this.props.store;

    this.state = this.store.getData();

    this.storeId = this.store.subscribe(this.onStoreChange);





    // callbacks for RoomInput
    this.roomViewActions = {
      selectRoom: key => {
        this.store.selectRoom(key);
      },
      addRoom: name => {
        this.store.addRoom(name);
      },
      deleteRoom: () => {
        this.store.deleteRoom();
      },
      isLobby: () => {
        return this.state.selectedRoom === '';
      }
    };

    // callbacks for MessageView, MessageViewList, MessageInput
    this.messageViewActions = {
      getRoomName: () => (this.store.getRoomName()),
      getMessages: () => (this.store.getMessages()),
      emitMessage: (messageBody) => {
        this.store.emitMessage(messageBody);
      }
    };
  } // constructor

  onStoreChange = (data) => {
    this.setState(data);
  }


  render() {
    const View = () =>
      (<div className="container">
        <div className="four columns">
          <div>
            <UserView
              localUser={this.state.localUser}
              users={this.state.users}
              selectedRoomKey={this.state.localUser.roomId}/>
          </div>
          <div>
            <RoomView rooms={this.state.rooms}
              localUser={this.state.localUser}
              selectedRoom={this.state.selectedRoom}
              actions={this.roomViewActions}/>
          </div>

        </div>
        <div className="eight columns">
          <MessageView
            localUser={this.state.localUser}
            actions={this.messageViewActions}/>
        </div>
      </div>);

    return (this.state.users) ? <View/> : <div>Loading...</div>;
  }
}

module.exports = ChatController;