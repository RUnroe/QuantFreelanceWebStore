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
		if(isFieldEmpty(field.value) || typeof field.value != "string" ||(field.regex && !field.regex.test(field.value))) {
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
		{name: "icon id", value: _user.icon_id}	
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
			console.log("Inserted User");
			return dbclient.db('QuantFreelance').collection('User').insertOne(record).then(() => user_id);
		})
	);
}

const getUserById = async ({user_id}) => {
	return await dbclient.db('QuantFreelance').collection('User').findOne({"user_id": user_id}).then(result => {
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



module.exports =  {
	createUser, getUserByEmail, getUserByUsername, getUserById
};