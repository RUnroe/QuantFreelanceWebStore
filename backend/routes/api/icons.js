const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require(require.main.path + '/routes/util');

const createIcon = (req, res) => {

}

const getIcon = (req, res) => {

}

const removeIcon = (req, res) => {

}




const routes = [
	{
		uri: '/api/product',
		methods: ['post'],
		handler: createIcon
	},
    {
		uri: '/api/product/:product_id',
		methods: ['get'],
		handler: getIcon
	},
    {
		uri: '/api/product/:order_id',
		methods: ['delete'],
		handler: removeIcon
	}
];


module.exports = { routes, configure };
