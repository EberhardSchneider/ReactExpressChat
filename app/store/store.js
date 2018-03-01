import dataHelper from '../helpers/DataHelpers.js';
import restHelper from '../helpers/RestHelpers.js';
import io from 'socket.io-client';
import guid from 'guid';


export default class Store {

  constructor(data) {
    this.data = data;

    this.listeners = {};
    this.id = 0;
  }

  setData(newData) {
    const mergedData = {
      ...this.data,
      ...newData
    };
    this.data = mergedData;
    this.triggerListeners();
  }

  getData() {
    return this.data;
  }

  subscribe(callback) {
    this.id++;
    this.listeners[this.id] = callback;
    return this.id;
  }

  unsubscribe(id) {
    if (this.listeners[id]) {
      delete this.listeners[id];
    }
  }

  triggerListeners() {
    Object.values(this.listeners)
      .map((callback) => {
        callback(this.data);
      });
  }

  addSocketEvents(user) {
    // store current User
    this.data.localUser = user;

    // socket events
    this.socket = io();

    this.socket.emit('add user', user);

    this.socket.on('user added', (users) => {
      this.setData({
        socket: this.socket,
        users: users,
      });
    });

    this.socket.on('users updated', (users) => {
      // delete localuser from common users object
      const id = this.data.localUser._id;
      if (users[id]) {
        delete users[id];
      }

      if (users) {
        this.setData({
          users: users
        });
      }
    });

    this.socket.on('user updated', (data) => {
      const {
        id,
        user
      } = data;
      let users = this.data.users;
      users[id] = user;
      this.setData({
        users
      });
    });

    this.socket.on('rooms updated', (data) => {
      if (data) {
        this.setData({
          rooms: dataHelper.mapFromObject(data.rooms)
        });
      }
    });

    this.socket.on('new message', (message) => {
      let messages = this.data.messages;
      messages.push(message);
      this.setData({
        messages
      });
    });
  }

  selectRoom(key) {
    if (key !== this.data.selectedRoom) {
      let localUser = this.data.localUser;
      localUser.roomId = key;
      this.socket.emit('join room', {
        key: key
      });
      this.setData({
        localUser,
        selectedRoom: key
      });
    }
  }

  addRoom(name) {
    const newRoom = {
      _id: guid.raw(),
      name: name,
      admin_userId: this.data.localUser._id
    };

    this.socket.emit('add room', newRoom);

    // update state/gui directly
    // so we don't have to wait for the socket connection
    let rooms = this.data.rooms;
    rooms[newRoom._id] = newRoom;
    this.setData({
      rooms: rooms
    });
  }

  getRoomName() {
    return this.data.rooms &&
      this.data.rooms[this.data.localUser.roomId] ?
      this.data.rooms[this.data.localUser.roomId].name :
      'Lobby';
  }

  getMessages() {
    return dataHelper.getMessagesFromRoomKey(this.data.messages, this.data.localUser.roomId);
  }

  emitMessage(messageBody) {
    this.socket.emit('new message', {
      message: messageBody
    });
  }
}