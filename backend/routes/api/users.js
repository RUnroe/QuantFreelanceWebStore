let db, snowmachine;
const configure = (obj) => {
	db = obj['db'];
	snowmachine = obj['snowmachine'];
};

const handle = (statusCode, req, res) => {
	return errors => {
		res.status(statusCode).json(errors)
	};
};

const expect = (obj, names, errors) => {
	if (names.constructor.name !== 'Array')
		names = [names];
	for (let name of names)
		if (!obj.hasOwnProperty(name))
			errors.push(`${name} was expected, but was not provided`);
};

const createUser = (req, res) => {
    const errors = [];
	expect(req.body, ['username', 'email', 'first_name', 'last_name', 'password', 'icon_id'], errors);
	if (errors.length) res.status(400).json(errors);
	else {
		db.createUser(req.body.username, req.body.email, req.body.first_name, req.body.last_name, req.body.password, req.body.icon_id, (req.body.is_seller == true))
			.then(user => {
				res.status(201).location(`/api/user/${user.user_id}`).json(user);
				return user;
			})
		    .catch(handle(500, req, res));
	}
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