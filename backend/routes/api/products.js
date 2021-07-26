const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');

const createProduct = (req, res) => {
	dal.createProduct(req.session.user_id, req.body).then(() => {
		res.status(201);
		res.statusMessage = 'Created Product';
		res.end();
	})
	.catch(handle(req, res));
}

const getProduct = (req, res) => {
	dal.getProduct(req.params.product_id).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}

const getProductsBySeller = (req, res) => {
	dal.getProductsBySeller(req.params.seller_id).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}

const getProductsByCategory = (req, res) => {
	dal.getProductsByCategory(req.params.category).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}

//Variable data pieces: title, price, description, category, cover_image, page_structure
const updateProduct = (req, res) => {
	dal.updateProduct(req.body.product_id, req.session.user_id, req.body).then(() => {
		res.status(201);
		res.statusMessage = 'Updated Product';
		res.end();
	})
	.catch(handle(req, res));
}

const removeProduct = (req, res) => {
	dal.removeProduct(req.body.product_id).then(() => {
		res.status(204);
		res.statusMessage = 'Removed Product';
		res.end();
	})
	.catch(handle(req, res));
}




const routes = [
	{
		uri: '/api/product',
		methods: ['post'],
		handler: [requireAuth(), createProduct]
	},
    {
		uri: '/api/product/:product_id',
		methods: ['get'],
		handler: getProduct
	},
    {
		uri: '/api/product/seller/:seller_id',
		methods: ['get'],
		handler: getProductsBySeller
	},
    {
		uri: '/api/product/category/:category',
		methods: ['get'],
		handler: getProductsByCategory
	}, 
    {
		uri: '/api/product',
		methods: ['put'],
		handler: [requireAuth(), updateProduct]
	}, 
    {
		uri: '/api/product',
		methods: ['delete'],
		handler: [requireAuth(), removeProduct]
	}
];


module.exports = { routes, configure };
