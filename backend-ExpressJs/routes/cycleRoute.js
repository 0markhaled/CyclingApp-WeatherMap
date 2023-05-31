//Omar
const router = require('express').Router();
const axios = require('axios'); //we ran "npm i axios -s" in the terminal to install axios
const cors = require('cors');


router.use(cors());
/* GET home page. */


router.get('/', async function (req, res, next) {


    let offset = req.query.offset == undefined ? 0 : req.query.offset;


    let url = `https://maps.ottawa.ca/arcgis/rest/services/CyclingMap/MapServer/3/query?outFields=*&where=1%3D1&f=geojson&resultOffset=${offset}&resultRecordCount=1000`;
    let fetch = await axios.get(url); //returns a promise
    let fetchResults = fetch.data;


    // let result = {      //result represent geometry which is a list of coordinates along the cycling route
    //     features: []
    // }



    // for (let i = 0; i < fetchResults.length; i++) {
    //     let arrayCoords = fetchResults[i].geometry.coordinates;//array of coords

    //     let latlong = {
    //         lat: arrayCoords[1],
    //         long: arrayCoords[0],

    //     };
    //     result.features.push(latlong);
    // }

    res.json(fetchResults);


});

module.exports = router;