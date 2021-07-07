const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require(require.main.path + '/routes/util');

const createOrder = (req, res) => {
	dal.createOrder(req.body).then(() => {
		res.status(201);
		res.statusMessage = 'Created User';
		res.end();
	})
	.catch(handle(req, res));
}

//get all orders (purchased) for user by user_id
const getOrdersByCustomer = (req, res) => {

}

//get all orders (sold) for user by user_id
const getOrdersBySeller = (req, res) => {

}

//Change order status (pending, accepted, declined, completed)
const updateOrderStatus = (req, res) => {

}



const routes = [
	{
		uri: '/api/order',
		methods: ['post'],
		handler: createOrder
	},
    {
		uri: '/api/order/customer/:order_id',
		methods: ['get'],
		handler: getOrdersByCustomer
	},
    {
		uri: '/api/order/seller/:order_id',
		methods: ['get'],
		handler: getOrdersBySeller
	}, 
    {
		uri: '/api/order/:order_id',
		methods: ['put'],
		handler: updateOrderStatus
	}
];


module.exports = { routes, configure };
