const mongoose = require('mongoose');


// mongoose.connect('mongodb://EbbSnyder:mVTIj6HOiXkXZssT@cluster0-shard-00-00-vhz9c.mongodb.net:27017,cluster0-shard-00-01-vhz9c.mongodb.net:27017,cluster0-shard-00-02-vhz9c.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
//   () => {
//     console.log('Connected');
//   });

mongoose.connect('mongodb://root:secret@ds247178.mlab.com:47178/heroku_ttxdpfrr', () => {
  console.log('Connected to local mongodb database');
});