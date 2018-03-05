import restHelper from '../helpers/RestHelpers';
import dataHelper from '../helpers/DataHelpers';

export default {
  getAndPushToStore: function(resource, store) {
    restHelper.get('/' + resource)
      .then((data) => {
        if (data) {
          store.setData({
            [resource]: data
          });
        }
      })
      .catch((error) => {
        console.log('Error getting data from url:' + url + error);
      });
  }
};