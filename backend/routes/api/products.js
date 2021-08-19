const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');

const createProduct = (req, res) => {
	dal.createProduct(req.session.user_id, req.body).then((result) => {
		res.json(result);
	})
	.catch(handle(req, res));
}

const getProduct = (req, res) => {
	dal.getProductById(req.params.product_id).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}

const getProductEdit = (req, res) => {
	dal.getProductById(req.params.product_id).then(result => {
		// console.log(req.session.user_id, result.seller);
		if(req.session.user_id == result.seller) res.json(result);
		else handle(req, res);
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

const getProductsBySearchTerm = (req, res) => {
	dal.getProductsBySearchTerm(req.params.search_term).then(result => {
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
		uri: '/api/product/edit/:product_id',
		methods: ['get'],
		handler: [requireAuth(), getProductEdit]
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
		uri: '/api/product/search/:search_term',
		methods: ['get'],
		handler: getProductsBySearchTerm
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
