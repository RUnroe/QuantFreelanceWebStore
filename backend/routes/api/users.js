const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');

const createUser = (req, res) => {
	dal.createUser(req.body)
		.then(user_id => {
			req.session.user_id = user_id.toString(); // log them in
			//res.header('Location', '/api/auth');
			res.status(201);
			res.statusMessage = 'Created User';
			res.end();
		})
		.catch(handle(req, res));
}

// Authenticate the user by assigning them a session/cookie
const authenticate = (req, res, next) => {
	dal.authenticate({identifier: req.body.identifier, password: req.body.password})
		.then(user_id => {
			console.log(user_id, 'logged in');
			if (user_id) {
				req.session.user_id = user_id;
				console.log(req.session);
				res.statusMessage = 'Authenticated';
				res.status(204).end();
				return;
			}
			res.sendStatus(401);
			return;
		})
		.catch(err => {console.log(err); return handle(req, res);});
};


const endSession = (req, res) => {
	req.session.destroy();
	res.status(204);
	res.statusMessage = 'Logged out';
	res.end();
};

const getUser = (req, res) => {
    dal.getUserById({user_id: req.params.user_id}).then( user => {
		res.json(user);
	})
	.catch(handle(req, res));
}

const updateUser = (req, res) => {
	dal.updateUser(req.session.user_id, req.body).then(() => {
		res.status(204);
		res.statusMessage = 'Updated User';
		res.end();
	})
	.catch(handle(req, res));

}

const removeUser = (req, res) => {
	dal.removeUser(req.session.user_id, req.body).then(() => {
		res.status(204);
		res.statusMessage = 'Removed User';
		res.end();
	})
	.catch(handle(req, res));
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
		uri: '/api/user',
		methods: ['put'],
		handler: [requireAuth(), updateUser]
	}, 
    {
		uri: '/api/user',
		methods: ['delete'],
		handler: [requireAuth(), removeUser]
	},

	{
		uri: '/api/auth',
		methods: ['post'],
		handler: authenticate
	},
	{
		uri: '/api/auth',
		methods: ['delete'],
		handler: [requireAuth(), endSession]
	},

];


module.exports = { routes, configure };