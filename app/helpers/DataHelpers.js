const dataHelper = {
  mapFromObject: function(object) {
    if (object === undefined)
      return undefined;
    return object.reduce((acc, curr) => {
      acc[curr._id] = curr;
      return acc;
    }, {});
  },

  getMessagesFromRoomKey: function(messages, key) {
    let result = [];
    result = messages.filter((message) => {
      return message.roomId == key;
    });
    return result;
  },
  getUsersFromRoomKey: function(users, key) {
    if (!users) return;
    let result = [];

    console.log('helper function:');
    console.log('before:');
    console.log({
      users,
      key
    });

    // and add id entry to object in array
    Object.entries(users).map((entry) => {
      const id = entry[0];
      let value = entry[1];
      if (value.roomId == key) {
        value.id = id;
        result.push(value);
      }
    });
    console.log('result:');
    console.log(result);

    return result;
  },
};

module.exports = dataHelper;