const {MongoClient} = require('mongodb');
const snowmachine = new (require('snowflake-generator'))(1420070400000);

const dbclient = new MongoClient(require('../secrets.json').mongo.connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
dbclient.connect().then(() => console.log("connected"));


const hasher = require('argon2');
const hash_options = {
	type: hasher.argon2id
};
const hash = async (pw) => {
	return hasher.hash(pw, hash_options)
		.catch(err => {
			const error_id = gen_id();
			throw ['An error occurred while hashing the supplied password'];
		});
};
const verify_hash = (hash, input) => hasher.verify(hash, input);

const gen_id = (errors = []) => snowmachine.generate().snowflake.toString();

const isFieldEmpty = field => {
	return (field === undefined || field === null);
}
const findErrors = fields => {
	const errors = [];
	fields.forEach(field => {
		if(isFieldEmpty(field.value) || typeof field.value != (field.type ? field.type : "string") ||(field.regex && !field.regex.test(field.value))) {
			errors.push(`Expected ${field.name}, but ${field.value} was supplied`);
		}
	});
	return errors;
}


// ==============================
//            Users
// ==============================

const createUser = async (_user) => {
	// console.log("req.body", _user);
	const errors = findErrors([
		{name: "username", value: _user.username, regex: /^[a-zA-Z0-9_ ]+$/}, 
		{name: "email", value: _user.email, regex: /\w+@\w+\.\w+/}, 
		{name: "first name", value: _user.first_name, regex: /^[a-zA-Z- ]+$/}, 
		{name: "last name", value: _user.last_name, regex: /^[a-zA-Z- ]+$/}, 
		{name: "password", value: _user.password, regex: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/}, 
	]);
	if (errors.length) {
		throw errors;
	}

    const user_id = gen_id();
	const record = Object.assign({}, _user, {user_id});
	if(typeof _user.is_seller != "boolean") record.is_seller = false;
	return getUserByEmail({email: record.email}).then(user => {
		if(user) throw [`A user already exists with the email address ${record.email}`];
	}).then(() => getUserByUsername({username: record.username})).then(user => {
		if(user) throw [`A user already exists with the username ${record.username}`];
	})
	.then(() => hash(record.password)
		.then(hashed_password => {
			record.password = hashed_password;
			return dbclient.db('QuantFreelance').collection('User').insertOne(record).then(() => user_id);
		})
	);
}

const getUserById = async ({user_id}) => {
	return await dbclient.db('QuantFreelance').collection('User').findOne({"user_id": user_id}).then(result => {
		if(!result) return null;
		delete result.password; return result;
	})
	.catch(err => { throw ['An error occurred while finding user by id'];});
}

const getUserByEmail = async ({email}) => {
	return await dbclient.db('QuantFreelance').collection('User').findOne({"email": email})
	.catch(err => { throw ['An error occurred while finding user by email'];});
}
const getUserByUsername = async ({username}) => {
	return await dbclient.db('QuantFreelance').collection('User').findOne({"username": username})
	.catch(err => { throw ['An error occurred while finding user by username'];});

}

const updateUser = async (user_id, user) => {
	let newValues = { $set: {}};
	if(!isFieldEmpty(user.username) && /^[a-zA-Z0-9_ ]+$/.test(user.username)) newValues['$set'].username = user.username;
	if(!isFieldEmpty(user.first_name) && /^[a-zA-Z- ]+$/.test(user.first_name)) newValues['$set'].first_name = user.first_name;
	if(!isFieldEmpty(user.last_name) && /^[a-zA-Z- ]+$/.test(user.last_name)) newValues['$set'].last_name = user.last_name;
	if(user.icon_id) newValues['$set'].icon_id = user.icon_id;
	if(user.is_seller) newValues['$set'].is_seller = (user.is_seller == true);
	return await dbclient.db('QuantFreelance').collection('User').updateOne({user_id}, newValues)
	.catch(err => { throw ['An error occurred while updating user'];});

}

const removeUser = async (user_id) => {
	console.log(user_id)
	return await dbclient.db('QuantFreelance').collection('User').deleteOne({user_id})
	.catch(err => { throw ['An error occurred while removing user'];});
	
}


// ==============================
//            Orders
// ==============================

const createOrder = async (_order) => {
	// console.log(_order);
	const errors = findErrors([
		{name: "buyer", value: _order.buyer}, 
		{name: "seller", value: _order.seller}, 
	]);
	if (errors.length) {
		throw errors;
	}
	if(!_order.message) _order.message = "";
	return getUserById({user_id: _order.buyer}).then(user => {
		if(!user) throw [`No user exists with the id "${_order.buyer}" `];
	}).then(() => getUserById({user_id: _order.seller})).then(user => {
		if(!user) throw [`No user exists with the id "${_order.seller}" `];
	}).then(() => {
		const order_id = gen_id();
		const record = Object.assign({}, _order, {order_id});
		if(_order.status != "pending" || _order.status != "accepted" ||
		_order.status != "declined" || _order.status != "completed")
			record.status = "pending";

		return dbclient.db('QuantFreelance').collection('Order').insertOne(record).then(() => order_id);
	});

}

const getOrdersByCustomer = async (user_id) => {
	return await dbclient.db('QuantFreelance').collection('Order').find({"buyer": user_id}).then(result => {
		return result.toArray();
	})
	.catch(err => { throw ['An error occurred while finding order by buyer id'];});
}

const getOrdersBySeller = async (user_id) => {
	return await dbclient.db('QuantFreelance').collection('Order').find({"seller": user_id}).then(result => {
		return result.toArray();
	})
	.catch(err => { throw ['An error occurred while finding order by seller id'];});
}

const updateOrderStatus = async (order_id, status) => {
	console.log(order_id, status);
	if(status == "pending" || status == "accepted" || status == "declined" || status == "completed") {
		let newStatus = {$set: {status}};
		console.log(newStatus);
		return dbclient.db('QuantFreelance').collection('Order').updateOne({order_id}, newStatus)
		.catch(err => { throw ['An error occurred while updating order status'];});
	}
	throw [`Expected 'pending', 'accepted', 'declined', or 'completed', but ${field.value} was supplied`];
}

// ==============================
//            Products
// ==============================

const createProduct = async (user_id, _product) => {
	try {
		_product.price = parseInt(_product.price);
	} catch (err) { throw ['An error occured while parsing price']};
	_product.seller = user_id;

	const errors = findErrors([
		{name: "seller id", value: _product.seller},
		{name: "price", value: _product.price, type:"number"},
		{name: "title", value: _product.title}, 
		{name: "category", value: _product.category}, 
	]);
	if(_product.price < 0) throw ['Price cannot be negative'];
	if(typeof _product.description != "string")  _product.description = "";
	if (errors.length) {
		throw errors;
	}

    const product_id = gen_id();
	const record = Object.assign({}, _product, {product_id});

	return dbclient.db('QuantFreelance').collection('Product').insertOne(record).then(() => product_id);
	
}
const getProductById = async (product_id) => {
	return await dbclient.db('QuantFreelance').collection('Product').findOne({product_id}).then(result => {
		return result;
	})
	.catch(err => { throw ['An error occurred while finding product by id'];});
}

const getProductsBySeller = async (user_id) => {
	return await dbclient.db('QuantFreelance').collection('Product').find({"seller": user_id}).then(result => {
		return result.toArray();
	})
	.catch(err => { throw ['An error occurred while finding product by seller id'];});
}

const getProductsByCategory = async (category) => {
	if(typeof category != "string") throw [`Expected a string for the category but ${category} was supplied`];
	return await dbclient.db('QuantFreelance').collection('Product').find({category}).then(result => {
		return result.toArray();
	})
	.catch(err => { throw ['An error occurred while finding product by category'];});
}

const updateProduct = async (product_id, user_id, product) => {
	//check if current user owns product
	getProductById(product_id).then(result => {
		if(result.seller != user_id) throw ['The user does not own the product they are attemting to update'];
		let newValues = { $set: {}};
		if(!isFieldEmpty(product.title)) newValues['$set'].title = product.title;
		if(!isFieldEmpty(product.price) && typeof product.price == "number" && product.price >= 0) newValues['$set'].price = product.price;
		if(!isFieldEmpty(product.category)) newValues['$set'].category = product.category;
		if(product.icon_id) newValues['$set'].icon_id = product.icon_id;
		return await dbclient.db('QuantFreelance').collection('Product').updateOne({product_id}, newValues)
		.catch(err => { throw ['An error occurred while updating product'];});
	});

	

}

const removeProduct = async (product_id) => {
	return await dbclient.db('QuantFreelance').collection('Product').deleteOne({product_id})
	.catch(err => { throw ['An error occurred while removing product'];});
	
}

// ==============================
//            Icons
// ==============================

const createIcon = async (url) => {
	if(isFieldEmpty(url)) throw [`Expected a url, but ${url} was supplied`];
	const record = {icon_id: gen_id(), url};
	return dbclient.db('QuantFreelance').collection('Icon').insertOne(record).then(() => url);
}

const getIcon = async (icon_id) => {
	return await dbclient.db('QuantFreelance').collection('Icon').findOne({icon_id}).then(result => {
		return result;
	})
	.catch(err => { throw ['An error occurred while finding product by id'];});
}



module.exports =  {
	createUser, getUserByEmail, getUserByUsername, getUserById, updateUser, removeUser,
	createOrder, getOrdersByCustomer, getOrdersBySeller, updateOrderStatus,
	createProduct, getProductById, getProductsBySeller, getProductsByCategory, updateProduct, removeProduct,
	createIcon, getIcon
};