// Styling
import "./css/universal.css";
import "./css/root.css";
import "./css/landing.css";
import "./css/mappage.css";
import "./css/info.css";
import "./css/contact.css";
import "./css/userpage.css";
import mapStyle from "./js/maplook.js";
import jsLocation from "./js/jsLocation";
import tt from '@tomtom-international/web-sdk-maps';

// Modules
import loginregisterWindow from "./js/loginregisterWindow";
// import scrollBackground from "./js/scrollbackground.js"; use this later

// list of pages for nav-link
import pages from './js/json/pages.js';

// templates
import templateRoot from './hbs/root.hbs';
import templateLanding from './hbs/landing.hbs';
import templateMap from './hbs/mappage.hbs';
import templateContact from './hbs/contact.hbs';
import templateInfo from './hbs/info.hbs';
import templateWeather from './hbs/weather.hbs';
import templateUserpage from './hbs/userpage.hbs';

// use root template, apply to "app" div
let appEl = document.getElementById("app");

// API url
const apiUrl = "https://localhost:7777/api/";

appEl.innerHTML = templateRoot(pages);

let mainEl = document.getElementById("root-main");

window.onload = () => {
	mainEl.innerHTML = templateLanding();

	let elsNavLink = document.getElementsByClassName("navigation-li");

	// calling the Login window
	let loginModule = new loginregisterWindow(
		"btn-login",
		"exitlogin",
		"logindialog-background",
		"loginsubmit",
		"registersubmit",
		(result) => {
			if (result.loggedIn) {
				mainEl.innerHTML = templateUserpage(loginModule.user);
			}
		},
		// registerCallback parameter
		// add system to send emails for when a user successfully registers to confirm registration
		(result) => {
			if (result.username != undefined) { // user successfully registered
				// loginModule.hideLogin();
			} else {
				console.log("Not Registered or user exists already");
			}
		});

	loginModule.init();

	for (let elLink of elsNavLink) {

		elLink.addEventListener('click', function () {
			let page = { name: this.dataset.link };

			// if Home is clicked on it shows the home page and fetches the stuff from the json file
			if (page.name === "Home") {
				mainEl.innerHTML = templateLanding();
			}

			if (page.name === "Map") {
				mainEl.innerHTML = templateMap({});
				jsLocation((position) => {
					console.log(position);
					initMap(position);
				});
			}

			if (page.name === "Info") {
				mainEl.innerHTML = templateInfo();
				// scrollBackground();
			}

			if (page.name === "Weather") {
				mainEl.innerHTML = templateWeather();
			}

			if (page.name === "User Page") {
				mainEl.innerHTML = templateUserpage();
			}

			else if (page.name === "Contact Us") {
				mainEl.innerHTML = templateContact();
			}
		});
	}
};

// Person handling weather can use this later
// weather().then((data) => {
// 	let weatherEl = document.getElementById("weatherBar");
// 	weatherEl.innerHTML = templateWeather(data);
// });

let map;


var markerHeight = 50, markerRadius = 10, linearOffset = 25;
var popupOffsets = {
	'top': [0, 0],
	'top-left': [0, 0],
	'top-right': [0, 0],
	'bottom': [0, -markerHeight],
	'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
	'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
	'left': [markerRadius, (markerHeight - markerRadius) * -1],
	'right': [-markerRadius, (markerHeight - markerRadius) * -1]
};
let initMap = (location) => { //location is json

	let pos = [location.longitude, location.latitude];

	map = tt.map({
		key: "Halz0PnAneUUAxyKTrE3lM5t4CwelDY1",
		container: "map",
		style: mapStyle, //taken from maplook.js file, ehich is a json export fom tomtom webiste, inserted into a "export default{} object"
		center: pos, //the center of the map
		zoom: 12, //the default zoom of the map
		pitch: 10 //the default pitch of the map
	});

	map.on('load', function () {
		routeHighlight();
	})

	//***add a marker to the map based on ip geo location, using the service defined in iplocation.js
	//let marker = new tt.Marker().setLngLat([location.long, location.lat]).addTo(map);

	//coordinates of the user location
	let userLong;
	let userLat;
	let marker;


	//***makes a marker at the browser's location when they accept sharing their location

	//console.log(pos);

	let jsMarker = new tt.Marker({
		color: 'red'
	}).setLngLat(pos).addTo(map);



};

let routeHighlight = () => {
	console.log("routeHighlight");
	let url = "https://localhost:7777/cycleRoutes";
	// Load and parse the JSON data

	// let geoJson = {
	// 	"type": "Feature",
	// 	"id": 2,
	// 	"geometry": {
	// 		"type": "LineString",
	// 		"coordinates": [
	// 			[
	// 				-75.687655420977805,
	// 				45.396627554715579,
	// 				0,
	// 				null
	// 			],
	// 			[
	// 				-75.687635556531916,
	// 				45.396735832031091,
	// 				0,
	// 				null
	// 			]
	// 		]
	// 	}
	// };



	fetch(url)

		.then(response => response.json())
		.then(data => {
			// Extract route information from the JSON data

			let geoJson = data;
			let layerInfo = {
				id: 'cycling-routes',
				type: 'line',
				source: {
					type: 'geojson',
					data: geoJson
				},
				paint: {
					'line-color': 'red',
					'line-width': 4
				}
			}

			map.addLayer(layerInfo);
		})


};