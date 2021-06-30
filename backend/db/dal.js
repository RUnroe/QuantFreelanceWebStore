const db = require('./db-connect');

const snowmachine = new (require('snowflake-generator'));

const hasher = require('argon2');
const hash_options = {
	type: hasher.argon2id
};

// ==============================
//            Users
// ==============================

const createUser = async (username, email, first_name, last_name, password, icon_id, is_seller) => {
    const errors = [];
	if (username === undefined || username === null)
		errors.push(`A username must be passed, but ${username} was supplied`);
	if (email === undefined || email === null)
		errors.push(`An email must be passed, but ${email} was supplied`);
    if (first_name === undefined || first_name === null)
		errors.push(`A first name must be passed, but ${first_name} was supplied`);
    if (last_name === undefined || last_name === null)
		errors.push(`A last name must be passed, but ${last_name} was supplied`);
	if (password === undefined || password === null)
		errors.push(`A password must be passed, but ${password} was supplied`);
    if (is_seller === undefined || is_seller === null)
		errors.push(`A boolean must be passed for the is_seller flag, but ${is_seller} was supplied`);
	if (icon_id === undefined || icon_id === null)
		errors.push(`An icon snowflake must be passed, but ${icon_id} was supplied`);
	else icon_id = coerceToLong(icon_id, errors);
	if (errors.length) {
		throw errors;
	}


    const database = client.db('QuantFreelance');
    const users = database.collection('User');

    const doc = { username: req.params.username,  };
    users.insertOne(doc).then((result) => {
        console.log(result);
        // Ensures that the client will close when you finish/error
        client.close();
        res.status(201).json(result);
    });
}