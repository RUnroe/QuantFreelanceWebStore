const handle = (statusCode, req, res) => {
	return errors => {
		res.status(statusCode).json(errors)
	};
};

const createUser = (req, res) => {

}

const getUser = (req, res) => {

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