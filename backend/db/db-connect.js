const { MongoClient } = require("mongodb");
const client = new MongoClient(require('../../secrets').mongo.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect().then(() => console.log('Connected to mongodb'));
module.exports = client;