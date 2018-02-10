const dataHelper = {
  mapFromObject: function(arr) {
    if (!arr) {
      console.log('mapFromObject: give array as argument');
      return;
    }

    return arr.reduce((acc, curr) => {
      acc[curr._id] = curr;
      return acc;
    }, {});

  },

  getMessagesFromRoomKey: function(messages, key) {
    return messages.filter(message => message.roomId == key);
  },

  getUsersFromRoomKey: function(users, key) {
    if (!users) {
      console.log('getUsersFromRoomKey: give arguments');
      return;
    }
    let result = [];

    Object.entries(users).map((entry) => {
      const id = entry[0];
      let user = entry[1];
      if (user.roomId == key) {
        user.id = id; // add id entry to object in array
        result.push(user);
      }
    });
    return result;
  },
};

module.exports = dataHelper;