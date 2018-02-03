const mongoose = require('mongoose');

// import User from './models/User';
// import Room from './models/Room';

mongoose.connect('mongodb://EbbSnyder:Castorp.7@cluster0-shard-00-00-vhz9c.mongodb.net:27017,cluster0-shard-00-01-vhz9c.mongodb.net:27017,cluster0-shard-00-02-vhz9c.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
  () => {
    console.log('Connected');
  });