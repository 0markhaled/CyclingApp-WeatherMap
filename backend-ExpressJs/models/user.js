const db = require("../modules/db");
const crypto = require('crypto');

module.exports = {
	'isUser': async function (username) {
		let conn = await db.getConnection();
		const result = await conn.query("select user_id from user where username = ?", [username]);
		conn.end();
		return result.length > 0;
	},

	'validateUser': async function (user_id, user_emailHash) {
		let conn = await db.getConnection();
		const result = await conn.query("select user_id from user where emailHash = ? and user_id = ?", [user_emailHash, user_id]);
		conn.end();
		if (result.length > 0) {
			conn = await db.getConnection();
			const result = await conn.query("update user set isValidated = 1,emailHash = null where user_id = ?", [user_id]);
			conn.end();
			return { 'validated': true }
		};
		return { 'validated': false };
	},
	'addUser': async function (username, email, password, last, first, profile_image) {
		console.log(username, email, password, last, first);
		if (username != null && email != null && password != null) {
			if (!await this.isUser(username)) {
				let conn = await db.getConnection();


				// (sha256 "hasher")
				// update generates a hash "object"
				// digest outputs it to a value

				// random code for email validation
				const emailHash = (crypto.createHash('sha256')).update("" + Math.random()).digest('base64');

				// hash the password 
				const passHash = (crypto.createHash('sha256')).update(password).digest('base64');

				const result = await conn.query("insert into user (username, email, passHash, last, first, profile_image, emailHash) values (?,?,?,?,?,?,?)", [username, email, passHash, last, first, profile_image, emailHash]);
				conn.end();

				result.user = { username: username, email: email, user_id: Number(result.insertId), last: last, first: first, profile_image: profile_image, emailHash };
				result.code = { code: emailHash, email: email };
				return result;
			} else {
				return false;
			}
		}
		return false;
	},

	'logout': async function (user_id) {
		let conn = await db.getConnection();
		const result = await conn.query("update user set cookieHash = null where user_id = ?", [user_id]);
		conn.end();
		return result;
	},
	'cookieLogin': async function (user_id, cookie) {

		let conn = await db.getConnection();
		const cookieHash = (crypto.createHash('sha256')).update(cookie).digest('base64');

		// check if the user_id and cookieHash EXIST in the database
		const result = await conn.query("select user_id,username,email,first,last,profile_image from `user` where user_id = ? and cookieHash = ? and isValidated =1 ",
			[user_id, cookieHash]);

		conn.end();
		if (result.length > 0) {
			const ret = {
				user: result[0],
				loggedIn: true
			};
			return ret;
		}
		return { loggedIn: false };
	},
	'passwordLogin': async function (username, password) {
		let conn = await db.getConnection();

		const passHash = (crypto.createHash('sha256')).update(password).digest('base64');

		const result = await conn.query("select user_id,username,email,first,last,profile_image from `user` where username = ? and passHash = ? and isValidated =1",
			[username, passHash]);

		conn.end();

		if (result.length > 0) {

			// a secret code, to allow the user to logijn with cookies
			// must match the stored cookieHash, to login with cookies
			let cookie = (crypto.createHash('sha256')).update('' + Math.random() * 99999999999999).digest('base64');
			// hash of cookie, to be store, so when logging in with cookies:
			// the cookie is hashed, and compared to the stored hash
			let cookieHash = (crypto.createHash('sha256')).update(cookie).digest('base64');


			// store the cookieHash in the database
			const connCookie = await db.getConnection();
			const resultCookie = await conn.query("update `user` set cookieHash = ? where user_id = ?",
				[cookieHash, result[0].user_id]);

			connCookie.end();

			// return the user data, the cookie, and a flag to indicate that the user is logged in
			const ret = {
				user: result[0],
				cookie: cookie,
				loggedIn: true
			};
			return ret;
		}

		return { loggedIn: false };
	},

	'addPhoto': async function (image_filename, user) {
		if (user.loggedIn) {
			let conn = await db.getConnection();
			const result = await conn.query(
				"update `user` set profile_image =? where user_id = ?",
				[image_filename, user.user.user_id]);

			conn.end();
			return result;
		}
		return { loggedIn: false };
	},

	'deletePhoto': async function (user) {
		if (user.loggedIn) {
			let conn = await db.getConnection();
			const result = await conn.query(
				"update `user` set profile_image = null where user_id = ?",
				[user.user.user_id]);

			conn.end();
			return result;
		}
		return { loggedIn: false };
	}

};