const express = require('express');
const router = express.Router();
const user = require('../../models/user');
const cors = require('cors');
const nodeMailer = require('nodemailer');
const fileUpload = require('express-fileupload');
const validator = require("email-validator");

router.use(fileUpload());


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
		if (validator.validate(req.body.userEmail)) {
			let re = await user.addUser(req.body.userUsername, req.body.userEmail, req.body.registerPassword, req.body.userLast, req.body.userFirst);

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
					text: 'Welcome! ' + re.user.username + '.\r\n Please click on this url https://localhost:7777/?code=' + re.code.code + '&uid=' + re.user.user_id + ' to confirm your registration!'
				});

				res.json(re.user);
			} else {
				res.json({ "message": "Could not register" });
			}
		} else {
			res.json({ "message": "You must enter a valid email address!" });
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

let uploadProfile = async (req, res) => {
	if (req.files && Object.keys(req.files).length !== 0) { // if there are files
		let photoUpl = req.files.photo;
		if (photoUpl.mimetype == "image/jpeg" ||
			photoUpl.mimetype == "image/png" ||
			photoUpl.mimetype == "image/webp") {

			let ext = photoUpl.mimetype.split("/")[1];
			let filename = photoUpl.md5 + '.' + ext;
			// move file to public/img
			dest_location = __dirname + '/../../public/img/' + filename;

			photoUpl.mv(dest_location, function (err) {
				if (err) {
					console.log(err);
					res.status(500).send("error");
				} else { // (only if no error occurs)
					// add to db via photo model
					console.log("file:" + photoUpl.md5);
					user.addPhoto(filename, req.login);
					res.json({
						'success': true,
						'filename': filename
					});
				}
			});
		} else {
			res.json({
				'success': false,
				'message': `<em>Invalid file type;</em> only jpg, png and webp allowed.`
			});
		}
	} else {
		user.deletePhoto(req.login);
		res.json({
			'success': false,
			'message': `No files were uploaded.`,
			'deleted': true
		});
	}
}



router.post('/edit/:field', async (req, res) => {

	if (req.login.loggedIn) {
		const field = req.params.field.toLowerCase();

		if (field === 'photo') {
			await uploadProfile(req, res);
		} else {
			const result = await user.editInfo(req.login, field, req.body.value);
			if (result.message != undefined) {
				res.json({
					'success': false,
					'message': result.message
				});
			} else {
				res.json({
					'success': true,
					'field': field
				});
			}
		}

	} else {
		res.json({
			'success': false,
			'message': `You are not logged in.`
		});

	}

});



module.exports = router;
