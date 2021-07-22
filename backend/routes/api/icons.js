const dal = {};
let upload;
const configure = (obj) => {
	Object.assign(dal, obj.dal);
	upload = obj['upload'];
	routes.filter(route => route.id === 'Upload Here')
		.forEach(route => route.handler.unshift(upload.single('icon')));
};

const { requireAuth, requireNotAuth, handle } = require('../util');

const createIcon = (req, res) => {
	const errors = [];

	let hasImage = false; if (req.file)     hasImage = true;
	let hasURL   = false; if (req.body.url) hasURL   = true;
	if (hasImage && hasURL)
		errors.push('Either an image or a JSON body with a URL must be specified, but both were supplied');
	if (!hasImage && !hasURL)
		errors.push('Either an image or a JSON body with a URL must be specified, but neither was supplied');
	if (errors.length) {
		res.status(400).json(errors);
		return;
	}

	if (hasImage) {
		req.body.url = uploadImageFile(req.file);
	}
	const userId = (req.session && req.session.userId) ? req.session.user_id : null;
	dal.createIcon(req.body.url, userId)
		.then(icon => {
			res.status(201)
				.location(`api/icons/${icon.icon_id}`)
				.json(icon);
		})
		.catch(handle(req, res));
};


const uploadImageFile = (file) => {
	return '/api/icons/' + file.filename;
};

const getIcon = (req, res) => {
    dal.getIcon(req.params.icon_id)
        .then(icon => {
            if (!icon) {
                res.sendStatus(404);
            }
            else res.redirect(301, icon.url);
        })
        .catch(handle(req, res));
}


const getIconsByUser = (req, res) => {
	if(!req.session || !req.session.user_id) res.json([]);
	else {
		dal.getProductsBySeller(req.session.user_id).then(result => {
			res.json(result);
		})
		.catch(handle(req, res));
	}
}



const routes = [
	{
		id: 'Upload Here',
		uri: '/api/icons',
		methods: ['post'],
		handler: [ createIcon]
	},
    {
		uri: '/api/icon/:icon_id',
		methods: ['get'],
		handler: getIcon
	},
	{
		uri: '/api/icons/user',
		methods: ['get'],
		handler: getIconsByUser
	}
];


module.exports = { routes, configure };
