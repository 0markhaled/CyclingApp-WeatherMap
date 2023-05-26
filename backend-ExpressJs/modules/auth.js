const user = require('../models/user');
module.exports = async (req, res, next) => {

	req.login = { loggedIn: false };
	let username = null;
	let password = null;
	//http body
	// ex:{"user": {"uid":uid, "ch":ch}}
	if (req.body.user != undefined) {
		if (req.body.user.username != undefined) {
			username = req.body.user.username;
		}
		if (req.body.user.password != undefined) {
			password = req.body.user.password;
		}
	}

	//query string
	// ex: /?uid=uid&ch=ch
	if (req.query.username != undefined) {
		username = req.query.username;
	}
	if (req.query.password != undefined) {
		password = req.query.password;
	}
	console.log(req.query, username, password);

	if (username != null && password != null) {
		let auth = await user.passwordLogin(
			username, password);

		req.login = auth;

	}


	// detect login by cookie by http body or query string
	let uid = null;
	let ch = null; //ch->cookiehash
	if (!req.login.loggedIn) {
		if (req.cookies.uid != undefined) {
			uid = req.cookies.uid;
		}
		if (req.cookies.ch != undefined) {
			ch = req.cookies.ch;
		}

		//http body
		// ex:{"user": {"uid":uid, "ch":ch}}
		if (req.body.user != undefined) {
			if (req.body.user.uid != undefined) {
				uid = req.body.user.uid;
			}
			if (req.body.user.ch != undefined) {
				ch = req.body.user.ch;
			}
		}

		//query string
		// ex: /?uid=uid&ch=ch
		if (req.query.uid != undefined) {
			uid = req.query.uid;
		}
		if (req.query.ch != undefined) {
			ch = req.query.ch;
		}

		if (ch != null && uid != null) {
			let auth = await user.cookieLogin(uid, ch);
			req.login = auth;
		}

	}
	console.log(req.login);
	next();
}

// for front end use:  
// Call localStorage() to store the cookies to the local Storage 