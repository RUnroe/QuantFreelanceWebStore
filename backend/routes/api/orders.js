const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require('../util');

const createOrder = (req, res) => {
	dal.createOrder(req.session.user_id, req.body).then((order_id) => {
		res.json(order_id);
	})
	.catch(handle(req, res));
}
//get all order by order_id
const getOrderById = (req, res) => {
	dal.getOrderById(req.params.order_id).then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}
//get all orders (purchased) for user by user_id
const getCurrentOrdersByCustomer = (req, res) => {
	dal.getOrdersByCustomer(req.session.user_id, "").then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}

const getPastOrdersByCustomer = (req, res) => {
	dal.getOrdersByCustomer(req.session.user_id, "completed").then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}

//get all orders (sold) for user by user_id
const getCurrentOrdersBySeller = (req, res) => {
	dal.getOrdersBySeller(req.session.user_id, "").then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}

const getPastOrdersBySeller = (req, res) => {
	dal.getOrdersBySeller(req.session.user_id, "completed").then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}

//Change order status (pending, accepted, declined, completed)
const updateOrderStatus = (req, res) => {
	dal.updateOrderStatus(req.params.order_id, req.body.status).then(() => {
		res.status(201);
		res.statusMessage = 'Updated Order';
		res.end();
	})
	.catch(handle(req, res));
}



const routes = [
	{
		uri: '/api/order',
		methods: ['post'],
		handler: [requireAuth(), createOrder]
	},
	{
		uri: '/api/order/:order_id',
		methods: ['get'],
		handler: getOrderById
	},
    {
		uri: '/api/order/customer/current',
		methods: ['get'],
		handler: getCurrentOrdersByCustomer
	},
	{
		uri: '/api/order/customer/past',
		methods: ['get'],
		handler: getPastOrdersByCustomer
	},
    {
		uri: '/api/order/seller/current',
		methods: ['get'],
		handler: getCurrentOrdersBySeller
	}, 
	{
		uri: '/api/order/seller/past',
		methods: ['get'],
		handler: getPastOrdersBySeller
	}, 
    {
		uri: '/api/order/:order_id',
		methods: ['put'],
		handler: [requireAuth(), updateOrderStatus]
	}
];


module.exports = { routes, configure };
