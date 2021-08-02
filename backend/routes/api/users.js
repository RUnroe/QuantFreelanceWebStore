const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');

const createUser = (req, res) => {
	dal.createUser(req.body)
		.then(({user_id, is_seller}) => {
			req.session.user_id = user_id.toString(); // log them in
			req.session.is_seller = is_seller.toString(); // log them in
			console.log("session created");
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
		.then(({user_id, is_seller}) => {
			console.log(user_id, 'logged in');
			if (user_id) {
				req.session.user_id = user_id;
				req.session.is_seller = is_seller.toString(); // log them in

				console.log("session created");
				res.statusMessage = 'Authenticated';
				res.status(303).location("/store").end();
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

const checkSession = (req, res) => {
	// console.log("check Auth:",req.session);
	
	if(req.session && req.session.user_id) {
		const is_seller = req.session.is_seller === "true" ? "seller" : "buyer";
		// res.json({authLevel: is_seller});
		dal.getUserById({user_id: req.session.user_id}).then( user => {
			let retUser = Object.assign(user, {authLevel: is_seller});
			delete retUser._id;
			delete retUser.is_seller;

			res.json(retUser);
		})
		.catch(handle(req, res));
	}
	else res.json({authLevel: ""});
}


const checkCredentials = (req, res) => {
	let user_id = null;
	if(req.session && req.session.user_id) user_id = req.session.user_id;
	dal.checkCredentials({user_id, username: req.body.username, email: req.body.email}).then(response => {
		// console.log(req.body.username, req.body.email);
		// console.log(response);
		res.json(response);
	})
	.catch(handle(req, res));
}

const getUserByUsername = (req, res) => {
	dal.getUserByUsername({username: req.params.username}).then( user => {
		res.json(user);
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
		uri: '/api/user/info/:username',
		methods: ['get'],
		handler: getUserByUsername
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
		uri: '/api/user/check',
		methods: ['post'],
		handler: checkCredentials
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
	{
		uri: '/api/auth',
		methods: ['get'],
		handler: checkSession
	},

];


module.exports = { routes, configure };