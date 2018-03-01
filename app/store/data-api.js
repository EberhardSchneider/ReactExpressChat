import restHelper from '../helpers/RestHelpers';
import dataHelper from '../helpers/DataHelpers';

export default {
  getRooms: function(store) {
    restHelper.get('/rooms')
      .then((data) => {
        if (data) {
          store.setData({
            rooms: dataHelper.mapFromObject(data)
          });
        }
      })
      .catch((error) => {
        console.log('Error getting room data:' + error);
      });
  }
};