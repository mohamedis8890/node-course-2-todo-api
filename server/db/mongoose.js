var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@gttodocluster-shard-00-00-zynaz.mongodb.net:27017,gttodocluster-shard-00-01-zynaz.mongodb.net:27017,gttodocluster-shard-00-02-zynaz.mongodb.net:27017/test?ssl=true&replicaSet=GTTodoCluster-shard-0&authSource=admin');

module.exports = { mongoose };