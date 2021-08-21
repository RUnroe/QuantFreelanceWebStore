const {MongoClient} = require('mongodb');
const snowmachine = new (require('snowflake-generator'))(1420070400000);

const dbclient = new MongoClient(require('../secrets.json').mongo.connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
console.log("Attempting to connect to database");
dbclient.connect().then(() => console.log("Connected")).catch(error => console.log("Could not connect", error));


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
			return dbclient.db('QuantFreelance').collection('User').insertOne(record).then(() => ({user_id, is_seller: record.is_seller}));
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
	return await dbclient.db('QuantFreelance').collection('User').deleteOne({user_id})
	.catch(err => { throw ['An error occurred while removing user'];});
	
}


const authenticate = async ({identifier, password}) => {
	return dbclient.db('QuantFreelance').collection('User').findOne({$or:[{"username":identifier},{"email":identifier}]})
		.then(result => {
			if (result)
				return verify_hash(result.password, password).then(ok => {
					if (ok) return {user_id: result.user_id, is_seller: result.is_seller};
					else return undefined;
				});
			else return undefined; 
		});
}

const checkCredentials = async ({user_id, username, email}) => {
	const errors = {username: false, email: false};
	await dbclient.db('QuantFreelance').collection('User').findOne({"username": username})
		.then(result => {
			if(result && user_id != result.user_id) errors.username = true;
		});
	await dbclient.db('QuantFreelance').collection('User').findOne({"email": email})
		.then(result => {
			if(result && user_id != result.user_id) errors.email = true;
		});
	return errors;
}

// ==============================
//            Orders
// ==============================

const createOrder = async (user_id, _order) => {
	const errors = findErrors([
		{name: "buyer", value: user_id}, 
		{name: "seller", value: _order.seller}, 
		{name: "product_id", value: _order.product_id}, 
	]);
	if (errors.length) {
		throw errors;
	}
	if(!_order.message) _order.message = "";
	return getUserById({user_id: user_id}).then(user => {
		if(!user) throw [`No user exists with the id "${user_id}" `];
	}).then(() => getUserById({user_id: _order.seller})).then(user => {
		if(!user) throw [`No user exists with the id "${_order.seller}" `];
	}).then(() => {
		const order_id = gen_id();
		const record = Object.assign({}, _order, {order_id, buyer: user_id});
		if(record.status != "pending" || record.status != "accepted" ||
		record.status != "declined" || record.status != "completed")
			record.status = "pending";

		return dbclient.db('QuantFreelance').collection('Order').insertOne(record).then(() => order_id);
	});

}

const getOrderById = async (order_id) => {
	return await dbclient.db('QuantFreelance').collection('Order').findOne({"order_id": order_id})
	.catch(err => { throw ['An error occurred while finding order by order id'];});
}
const getOrdersByCustomer = async (user_id, status) => {
	const find = status ? {$and:[{"buyer": user_id},{"status":status}]} : {"buyer": user_id};
	let orderArray = await dbclient.db('QuantFreelance').collection('Order').find(find).toArray()
	.catch(err => { throw ['An error occurred while finding order by buyer id'];});

	return await Promise.all(orderArray.map (order => getFullOrderObj(order, "seller") ));
}

const getOrdersBySeller = async (user_id, status) => {
	const find = status ? {$and:[{"seller": user_id},{"status":status}]} : {"seller": user_id};
	let orderArray = await dbclient.db('QuantFreelance').collection('Order').find(find).toArray()
	.catch(err => { throw ['An error occurred while finding order by seller id'];});

	return await Promise.all(orderArray.map (order => getFullOrderObj(order, "buyer") ));
}

const getFullOrderObj = async (order, userType) => {
	await getUserById({user_id: order[userType]}).then(user => {
		order = Object.assign(order, {user: {"name": `${user.first_name} ${user.last_name}`, "username": user.username}});
		return order; 
	})
	await getProductById(order.product_id).then(product => {
		order = Object.assign(order, {title: product.title});
		return order; 
	});
	return order;
}

const updateOrderStatus = async (order_id, status) => {
	// console.log(order_id, status);
	if(status == "pending" || status == "accepted" || status == "declined" || status == "completed") {
		let newStatus = {$set: {status}};
		// console.log(newStatus);
		return dbclient.db('QuantFreelance').collection('Order').updateOne({order_id}, newStatus)
		.catch(err => { throw ['An error occurred while updating order status'];});
	}
	throw [`Expected 'pending', 'accepted', 'declined', or 'completed', but ${status} was supplied`];
}

// ==============================
//            Products
// ==============================

const createProduct = async (user_id, _product) => {
	try {
		_product.price = parseInt(_product.price);
	} catch (err) { throw ['An error occured while parsing price']};
	_product.seller = user_id;

	// const errors = findErrors([
	// 	{name: "seller id", value: _product.seller},
	// 	{name: "price", value: _product.price, type:"number"},
	// 	{name: "title", value: _product.title}, 
	// 	{name: "category", value: _product.category}, 
	// ]);
	if(_product.price < 0) throw ['Price cannot be negative'];
	if(typeof _product.description != "string")  _product.description = "";
	if(typeof _product.icon_id != "string")  _product.icon_id = "";
	// if (errors.length) {
	// 	throw errors;
	// }

    const product_id = gen_id();
	const record = Object.assign({}, _product, {product_id});

	return dbclient.db('QuantFreelance').collection('Product').insertOne(record).then(() => product_id);
	
}
const getProductById = async (product_id, type) => {
	return await dbclient.db('QuantFreelance').collection('Product').findOne({product_id}).then(result => {
		const retObj = {
			price: result.price,
			title: result.title,
			description: result.description,
			category: result.category,
			page_structure: (type === "saved" && result.saved_page_structure) ? result.saved_page_structure : page_structure,
			icon_id: result.icon_id,
			seller: result.seller,
			product_id: result.product_id
		}
		return type ? retObj : result;
	})
	.catch(err => { throw ['An error occurred while finding product by id'];});
}

const getProductsBySeller = async (user_id) => {
	let productArray = await dbclient.db('QuantFreelance').collection('Product').find({"seller": user_id}).toArray()
	.catch(err => { throw ['An error occurred while finding product by seller id'];});
	return await Promise.all(productArray.map (product => getFullProductObj(product) ));
}

const getProductsByCategory = async (category) => {
	if(typeof category != "string") throw [`Expected a string for the category but ${category} was supplied`];
	let productArray = await dbclient.db('QuantFreelance').collection('Product').find({category}).toArray()
	.catch(err => { throw ['An error occurred while finding product by category'];});

	return await Promise.all(productArray.map (product => getFullProductObj(product) ));
}

const getProductsBySearchTerm = async (search_term) => {
	if(isFieldEmpty(search_term)) throw [`Expected a string for the category but nothing was supplied`];
	if(typeof search_term != "string") throw [`Expected a string for the category but ${search_term} was supplied`];
	let productArray = await dbclient.db('QuantFreelance').collection('Product').find({$or:[{"title":{'$regex' : search_term, '$options' : 'i'}},{"category":{'$regex' : search_term, '$options' : 'i'}}]}).toArray()
	.catch(err => { throw ['An error occurred while finding product by category'];});

	return await Promise.all(productArray.map (product => getFullProductObj(product) ));
}

const getFullProductObj = async (product) => {
	return await getUserById({user_id: product.seller}).then(user => {
		delete product.page_structure; 
		delete product.saved_page_structure; 
		product = Object.assign(product, {user: user});
		return product; 
	}) 
}

const updateProduct = async (product_id, user_id, product) => {
	//check if current user owns product
	getProductById(product_id).then(result => {
		product.price = parseInt(product.price);
		if(result.seller != user_id) throw ['The user does not own the product they are attemting to update'];
		let newValues = { $set: {
			description: product.description,
			saved_page_structure: product.saved_page_structure
		}};
		if(!isFieldEmpty(product.title)) newValues['$set'].title = product.title;
		if(!isFieldEmpty(product.price) && typeof product.price == "number" && product.price >= 0) newValues['$set'].price = product.price;
		if(!isFieldEmpty(product.category)) newValues['$set'].category = product.category;
		if(product.icon_id) newValues['$set'].icon_id = product.icon_id;
		return dbclient.db('QuantFreelance').collection('Product').updateOne({product_id}, newValues)
		.catch(err => { console.log(err); throw ['An error occurred while updating product'];});
	}).catch(err => { console.log(err); throw ['An error occurred while updating product'];});

}

const publishProduct = async (product_id, user_id) => {
	//check if current user owns product
	getProductById(product_id).then(result => {
		if(result.seller != user_id) throw ['The user does not own the product they are attemting to update'];
		let newValues = { $set: {
			page_structure: result.saved_page_structure
		}};
		return dbclient.db('QuantFreelance').collection('Product').updateOne({product_id}, newValues)
		.catch(err => { console.log(err); throw ['An error occurred while updating product'];});
	}).catch(err => { console.log(err); throw ['An error occurred while updating product'];});

}

const removeProduct = async (product_id) => {
	return await dbclient.db('QuantFreelance').collection('Product').deleteOne({product_id})
	.catch(err => { throw ['An error occurred while removing product'];});
	
}

// ==============================
//            Icons
// ==============================

const createIcon = async (url, userId) => {
	if(isFieldEmpty(url)) throw [`Expected a url, but ${url} was supplied`];
	const record = {icon_id: gen_id(), url, owner: userId};
	return dbclient.db('QuantFreelance').collection('Icon').insertOne(record).then(() => record);
}

const getIcon = async (icon_id) => {
	return await dbclient.db('QuantFreelance').collection('Icon').findOne({icon_id}).then(result => {
		return result;
	})
	.catch(err => { throw ['An error occurred while finding product by id'];});
}

const getIconsByUser = async (user_id) => {
	return await dbclient.db('QuantFreelance').collection('Icon').find({"owner": user_id}).toArray()
	.catch(err => { throw ['An error occurred while finding icons by user id'];});
}


module.exports =  {
	createUser, getUserByEmail, getUserByUsername, getUserById, updateUser, removeUser,
	authenticate, checkCredentials,
	createOrder, getOrderById, getOrdersByCustomer, getOrdersBySeller, updateOrderStatus,
	createProduct, getProductById, getProductsBySeller, getProductsByCategory, getProductsBySearchTerm, updateProduct, removeProduct, publishProduct,
	createIcon, getIcon, getIconsByUser
};