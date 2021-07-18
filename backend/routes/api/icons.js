const dal = {};
const upload = require('multer')({ dest: __dirname + '/public/icons' });
const configure = (obj) => {
	Object.assign(dal, obj.dal);
};

const { requireAuth, requireNotAuth, handle } = require('../util');

const createIcon = (req, res) => {
	console.log(req.file, req.body);
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

	dal.createIcon(req.body.url)
		.then(icon => {
			res.status(201)
				.location(`api/icons/${icon.icon_id}`)
				.json(icon);
		})
		.catch(handle(req, res));
};


const uploadImageFile = (file) => {
	return '/icons/' + file.filename;
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





const routes = [
	{
		uri: '/api/icons',
		methods: ['post'],
		handler: [upload.single('icon'), createIcon]
	},
    {
		uri: '/api/icon/:icon_id',
		methods: ['get'],
		handler: getIcon
	}
];


module.exports = { routes, configure };
