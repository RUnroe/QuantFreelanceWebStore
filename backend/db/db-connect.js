const { MongoClient } = require("mongodb");
const client = new MongoClient(require('../secrets.json').mongo.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// let users, products, orders;
client.connect().then(() => {
    console.log('Connected to mongodb')
    // const database = client.db('QuantFreelance');
    // users = database.collection('User');
    // products = database.collection('Product');
    // orders = database.collection('Order');
    module.exports = client.db('QuantFreelance');
});