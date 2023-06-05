const express = require('express');
const router = express.Router();
const user = require('../../models/user');
const cors = require('cors');
const nodeMailer = require('nodemailer');

router.use(cors());
// if user is logged in:
// 	loggedIn = true, user = {user_id, username, email}
// not logged in
// 	loggedIn = false
router.get('/', async function (req, res, next) {
	res.json(req.login);
});


// router.post('/', async function (req, res, next) {

// 	res.json(req.login);
// });

// if user is not logged in:
//  we can request adding a user by sending username, email, password in the body of the request
// return the username, email, user_id if successful
router.post('/register', async function (req, res, next) {

	if (req.login.loggedIn) {
		res.json({ "message": "Already Loggedin" });

	} else {
		console.log(req.body);
		// whats profile_image?
		let re = await user.addUser(req.body.userUsername, req.body.userEmail, req.body.registerPassword, req.body.userLast, req.body.userFirst, "req.body.profile_image");

		if (re && re.affectedRows == 1) {
			// console.log(re.code);
			// we send an email when a new user registered
			const emailer = nodeMailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'weijacky1978@gmail.com',
					pass: 'myhhrrycamjzvysv'
				}
			});

			const result = await emailer.sendMail({
				from: 'weijacky1978@gmail.com',
				to: re.code.email,
				subject: 'Hello New User ' + re.user.username,
				text: 'Welcome! ' + re.user.username + '.\r\n Please click on this url https://localhost:7777/?code=' + re.code.code + '&uid=' + re.user.user_id
			});

			res.json(re.user);
		} else {
			res.json({ "message": "Could not register" });
		}
	}
});


router.post('/validate', async function (req, res) {
	if (req.body.code != undefined && req.body.code != null) {
		console.log(req.body.code, req.body.uid);
		const result = await user.validateUser(req.body.uid, req.body.code);
		res.json(result);
	}
});
module.exports = router;
