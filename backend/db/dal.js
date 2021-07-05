const { client, users, products, orders} = require('./db-connect');




//const snowmachine = new (require('snowflake-generator'));

const hasher = require('argon2');
const hash_options = {
	type: hasher.argon2id
};
const hash = async (pw) => {
	return hasher.hash(pw, hash_options)
		.catch(err => {
			const error_id = gen_id();
			logger.error(JSON.stringify([error_id.toString(), err]));
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
		if(isFieldEmpty(field.value)) {
			errors.push(`Expected ${field.name}, but ${field.value} was supplied`);
		}
	});
	return errors;
}
// ==============================
//            Users
// ==============================

const createUser = async (username, email, first_name, last_name, password, icon_id, is_seller) => {
	const errors = findErrors([
		{name: "username", value: username}, 
		{name: "email", value: email}, 
		{name: "first name", value: first_name}, 
		{name: "last name", value: last_name}, 
		{name: "password", value: password}, 
		{name: "icon id", value: icon_id}	
	]);
	if (errors.length) {
		throw errors;
	}
	if(typeof is_seller != "boolean") is_seller = false;

    const user_id = gen_id();
	const record = Object.assign({}, user, {user_id});
	return getUserByEmail({email: record.email}).then(user => {
		if(user) throw [`A user already exists with the email address ${record.email}`];
	}).then(getUserByUsername({username: record.username})).then(user => {
		if(user) throw [`A user already exists with the username ${record.username}`];
	})
	.then(() => hash(record.password)
		.then(hashed_password => {
			record.password = hashed_password;
			return users.insertOne(record).then(_ => user_id);
		})
	);
}


const getUserByEmail = async ({_email}) => {
	users.find({"email": _email}).then(result => {
		console.log(result);
	});
}



module.exports = ({db, snowmachine}) => {
	//configure({db, snowmachine});
	return {
		db
		, createUser, getUserByEmail
	};
	// return {
	// 	db
	// 	, createUser, getUserById, getUserByEmail, updateUser, authenticate
	// 	, updateCalendars, getCalendarDetails, getCalendarEventsByUserIds
	// 	, searchFriends, createFriendship, getFriendships, getPendingFriendships, acceptFriendship, declineFriendship, endFriendship
	// };
};