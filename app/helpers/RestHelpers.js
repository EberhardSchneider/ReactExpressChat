import $ from 'jquery';

export default {
  get: (url) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'JSON',
        success: resolve,
        error: reject
      });
    });
  }
};