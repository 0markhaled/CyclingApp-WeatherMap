// Styling
import "./css/universal.css";
import "./css/root.css";
import "./css/landing.css";
import "./css/mappage.css";
import "./css/info.css";
import "./css/contact.css";
import "./css/userpage.css";

import jsLocation from "./js/jsLocation";

import mapTool from "./js/map.js";

// Modules
import loginregisterWindow from "./js/loginregisterWindow";
// import scrollBackground from "./js/scrollbackground.js"; use this later

// list of pages for nav-link
import pages from './js/json/pages.js';

//import toggle feature in info page
import toggle from "./js/info";

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

let map;

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
					map = new mapTool("map", position);
					map.drawCycleRoutes();

				});
			}

			if (page.name === "Info") {
				mainEl.innerHTML = templateInfo();
				toggle();
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