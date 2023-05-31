const express = require('express');
const router = express.Router();
const user = require('../../models/user');
const cors = require('cors');

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
			res.json(re.user);
		} else {
			res.json({ "message": "Could not register" });
		}
	}
});

module.exports = router;
