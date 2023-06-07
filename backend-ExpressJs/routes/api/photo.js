const express = require('express');
const router = express.Router();
const photo = require('../models/photo');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.post('/add', async (req, res) => {
    if (req.login.loggedIn) {
        if (req.files && Object.keys(req.files).length !== 0) { // if there are files
            let photoUpl = req.files.photo;
            if (photoUpl.mimetype == "image/jpeg" ||
                photoUpl.mimetype == "image/png" ||
                photoUpl.mimetype == "image/webp") {

                let ext = photoUpl.mimetype.split("/")[1];
                let filename = photoUpl.md5 + '.' + ext;
                // move file to public/images/gallery
                dest_location = __dirname + '/../public/img/' + filename;
                console.log(dest_location);
                photoUpl.mv(dest_location, function (err) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("error");
                    } else { // (only if no error occurs)
                        // add to db via photo model
                        console.log("file:" + photoUpl.md5);
                        photo.addPhoto(filename, req.body.description);
                        res.redirect('/photo/');
                    }
                });
            } else {
                res.send(`<em>Invalid file type;</em> only jpg, png and webp allowed.`);
            }
        } else {
            res.send(`No files were uploaded.`);
        }
    } else {
        res.render('notloggedin', { redirect: req.baseUrl + req.path });
    }
});

module.exports = router;