export default {
  getMessagesFromRoomKey: function(messages, key) {
    let result = [];
    for (const m in messages) {
      if (m.roomId == key) {
        result.push(m);
      }
    }
    return result;
  },
  getUsersFromRoomKey: function(users, key) {
    let result = [];
    for (const u in users) {
      if (u.roomId == key) {
        result.push(u);
      }
    }
    return result;
  },
};