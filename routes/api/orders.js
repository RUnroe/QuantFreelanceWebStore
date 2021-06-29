const handle = (statusCode, req, res) => {
	return errors => {
		res.status(statusCode).json(errors)
	};
};

const createOrder = (req, res) => {

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


module.exports = { routes };