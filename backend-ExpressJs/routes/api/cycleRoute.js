//Omar
const router = require('express').Router();
const axios = require('axios'); //we ran "npm i axios -s" in the terminal to install axios
const cors = require('cors');
const routeModel = require('../../models/route');


router.use(cors());
/* GET home page. */




router.post('/', async function (req, res, next) {
    //console.log(req.login);

    if (req.login.loggedIn) {


        const user_id = req.login.user.user_id;
        const data = req.body.route;
        const result = await routeModel.saveRoute(data.name, data.distance, data.time, JSON.stringify(data.points), user_id);
        res.json(result);
    } else {
        res.json({
            'success': false,
            'message': `You are not logged in.`
        });
    }

});

router.get('/', async function (req, res, next) {

    if (req.login.loggedIn) {
        const user_id = req.login.user.user_id;
        const result = await routeModel.fetchRoutes(user_id);
        res.json(result);
    } else {
        res.json({
            'success': false,
            'message': `You are not logged in.`
        });
    }

});

router.delete('/', async function (req, res, next) {
    if (req.login.loggedIn) {
        const user_id = req.login.user.user_id;
        const route_id = req.params.route_id;
        const result = await routeModel.deleteRoute(user_id, route_id);

        if (result) {
            res.json({ success: true, message: 'Route deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Route not found' });
        }
    } else {
        res.json({
            success: false,
            message: 'You are not logged in.'
        });
    }
});




module.exports = router;