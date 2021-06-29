const { MongoClient } = require("mongodb");
const client = new MongoClient(require('../../secrets').mongo.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const handle = (statusCode, req, res) => {
	return errors => {
		res.status(statusCode).json(errors)
	};
};

const createUser = (req, res) => {
    client.connect().then(() => {

        const database = client.db('QuantFreelance');
        const users = database.collection('User');

        const doc = { username: "Red", town: "kanto" };
        users.insertOne(doc).then((result) => {
            console.log(result);
            // Ensures that the client will close when you finish/error
            client.close();
            res.status(201).json(result);
        });

        
    });

}

const getUser = (req, res) => {
    handle(500, req, res);
}

const updateUser = (req, res) => {

}

const removeUser = (req, res) => {

}


const routes = [
	{
		uri: '/api/user',
		methods: ['post'],
		handler: createUser
	},
    {
		uri: '/api/user/:user_id',
		methods: ['get'],
		handler: getUser
	},
    {
		uri: '/api/user/:user_id',
		methods: ['put'],
		handler: updateUser
	}, 
    {
		uri: '/api/user/:user_id',
		methods: ['delete'],
		handler: removeUser
	}
];


module.exports = { routes };