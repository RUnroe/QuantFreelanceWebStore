const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require(require.main.path + '/routes/util');

const createProduct = (req, res) => {

}

const getProduct = (req, res) => {

}

const getProductsBySeller = (req, res) => {

}

const getProductsByCategory = (req, res) => {

}

//Variable data pieces: title, price, description, category, cover_image, page_structure
const updateProduct = (req, res) => {

}

const removeProduct = (req, res) => {

}




const routes = [
	{
		uri: '/api/product',
		methods: ['post'],
		handler: createProduct
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
		uri: '/api/product/:order_id',
		methods: ['put'],
		handler: updateProduct
	}, 
    {
		uri: '/api/product/:order_id',
		methods: ['delete'],
		handler: removeProduct
	}
];


module.exports = { routes, configure };
