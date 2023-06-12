//Omar
const router = require('express').Router();
const axios = require('axios'); //we ran "npm i axios -s" in the terminal to install axios
const cors = require('cors');
const routeModel = require('../../models/route');


router.use(cors());
/* GET home page. */




router.post('/', async function (req, res, next) {
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




// router.get('/', async function (req, res, next) {


//     let offset = req.query.offset == undefined ? 0 : req.query.offset;


//     let url = `https://maps.ottawa.ca/arcgis/rest/services/CyclingMap/MapServer/3/query?outFields=*&where=1%3D1&f=geojson&resultOffset=${offset}&resultRecordCount=1000`;
//     let fetch = await axios.get(url); //returns a promise
//     let fetchResults = fetch.data;


//     res.json(fetchResults);


// });

module.exports = router;