import restHelper from '../helpers/RestHelpers';
import dataHelper from '../helpers/DataHelpers';

export default {
  getAndPushToStore: function(url, store) {
    restHelper.get(url)
      .then((data) => {
        if (data) {
          store.setData({
            rooms: dataHelper.mapFromObject(data)
          });
        }
      })
      .catch((error) => {
        console.log('Error getting data frum url:' + url + error);
      });
  }
};