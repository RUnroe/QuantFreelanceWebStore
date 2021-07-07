const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireAuth, requireNotAuth, handle } = require(require.main.path + '/routes/util');

const createOrder = (req, res) => {
	dal.createOrder(req.body).then(() => {
		res.status(201);
		res.statusMessage = 'Created Order';
		res.end();
	})
	.catch(handle(req, res));
}

//get all orders (purchased) for user by user_id
const getOrdersByCustomer = (req, res) => {
	dal.getOrdersByCustomer("861770015727337472").then(result => {
		res.json(result);
	})
	.catch(handle(req, res));
}

//get all orders (sold) for user by user_id
const getOrdersBySeller = (req, res) => {
	dal.getOrdersBySeller("861776823657398272").then(result => {
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
		handler: createOrder
	},
    {
		uri: '/api/order/customer',
		methods: ['get'],
		handler: getOrdersByCustomer
	},
    {
		uri: '/api/order/seller',
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
