const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require(require.main.path + '/routes/util');

const createUser = (req, res) => {
	dal.createUser(req.body)
		.then(user_id => {
			// req.session.user_id = user_id.toString(); // log them in
			// res.header('Location', '/api/auth');
			res.sendStatus(201);
		})
		.catch(handle(req, res));
}

// Authenticate the user by assigning them a session/cookie
const authenticate = (req, res, next) => {
	dal.authenticate({email: req.body.email, password: req.body.password})
		.then(user_id => {
			if (user_id) {
				req.session.user_id = user_id.toString();
				res.statusMessage = 'Authenticated';
				res.status(204).end();
				return;
			}
			res.sendStatus(401);
			return;
		})
		.catch(handle(req, res));
};


const getUser = (req, res) => {
    dal.getUserById({user_id: req.params.user_id}).then( user => {
		res.json(user);
	}).catch(handle(req, res));
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


module.exports = { routes, configure };