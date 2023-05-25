const express = require('express');
const page = require('../models/page');
const router = express.Router();
const user = require('../models/user');
const nodeMailer = require('nodemailer');


router.get('/', async function (req, res, next) {
	const menuItems = await page.getMenuItems();
	if (req.login.loggedIn) {
		res.render('user', { login: req.login, menu: menuItems });
	} else {
		res.redirect("/user/register");
	}

});
router.get('/register', async function (req, res, next) {
	const menuItems = await page.getMenuItems();
	if (req.login.loggedIn) {
		res.redirect("/user");

	} else {
		res.render('userRegister', { menu: menuItems, title: "Register" });
	}

});



router.post('/register', async function (req, res, next) {
	const menuItems = await page.getMenuItems();
	if (req.login.loggedIn) {
		res.redirect("/user");

	} else {
		let re = await user.addUser(req.body.username, req.body.email, req.body.password);
		res.send("registered");
	}

});
module.exports = router;
