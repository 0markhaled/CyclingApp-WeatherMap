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
import loginregisterWindow from "./js/loginregisterWindow.js";
import authorization from "./js/authorization.js";
import userpageNav from "./js/userpageNav";
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
import templateAqi from './hbs/aqi.hbs';
import templateUserpage from './hbs/userpage/userpage.hbs';

// use root template, apply to "app" div
let appEl = document.getElementById("app");

// API url
const apiUrl = "https://localhost:7777/api/";
const rootUrl = "https://localhost:7777/";

appEl.innerHTML = templateRoot(pages);

let mainEl = document.getElementById("root-main");

let map;

window.onload = async () => {

	let weatherData = await fetch(rootUrl + "weather");

	let weatherDatajson = await weatherData.json();

	//document.getElementById("weather-container").innerHTML = `<div><span>${weatherDatajson.city}</span></div>`;
	document.getElementById("weather-container").innerHTML = templateWeather(weatherDatajson);

	let aqiData = await fetch(rootUrl + "weather/" + "aqi");
	let aqiDatajson = await aqiData.json();

	document.getElementById("weather-aqi-container").innerHTML = templateAqi(aqiDatajson);


	// event handler for logout btn
	document.getElementById("btn-logout").addEventListener('click', (ev) => {
		authorization.logOut();
		// maybe add something here to make it a cleaner transition
		mainEl.innerHTML = templateLanding();
		alert("You have logged out!")
		document.getElementById('btn-login').style.display = 'block';
		document.getElementById('btn-logout').style.display = 'none';
	});

	authorization.loginState = await authorization.storedLogin();

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
			authorization.loginState = result;
			if (result.loggedIn) {
				mainEl.innerHTML = templateUserpage(authorization.loginState);
				authorization.saveCredentials(result.cookie, result.user.user_id);
				userpageNav.userpageNav({ userinfo: authorization.loginState });
				document.getElementById('btn-login').style.display = 'none';
				document.getElementById('btn-logout').style.display = 'block';

			} else {
				document.getElementById('btn-login').style.display = 'block';
				document.getElementById('btn-logout').style.display = 'none';

			}
		},
		// registerCallback parameter
		// add system to send emails for when a user successfully registers to confirm registration
		(result) => {
			if (result.username != undefined) { // user successfully registered
				// loginModule.hideLogin();
			} else {
				if (result.message != undefined) {
					alert(result.message);
				} else {
					alert('Could not register');
				}
			}
		});

	loginModule.init();

	// Hide or show login/logout buttons based on login state
	if (await authorization.validate()) {
		loginModule.hideLogin(false);
		document.getElementById('btn-login').style.display = 'none';
		document.getElementById('btn-logout').style.display = 'block';
		alert("user validated");
	} else {
		document.getElementById('btn-login').style.display = 'block';
		document.getElementById('btn-logout').style.display = 'none';
	}

	// alert for when the user is validated
	if (await authorization.validate()) {
		loginModule.hideLogin(false);
		alert("user validated");
	}

	for (let elLink of elsNavLink) {
		elLink.addEventListener('click', function () {
			let page = { name: this.dataset.link };

			switch (page.name) {
				case "Home":
					mainEl.innerHTML = templateLanding();
					break;

				case "Map":
					mainEl.innerHTML = templateMap({});
					jsLocation((position) => {
						//console.log(position);
						map = new mapTool("map", position);
						// map.drawCycleRoutes();
					});
					break;

				case "Info":
					mainEl.innerHTML = templateInfo();
					toggle();
					// scrollBackground();
					break;

				case "Weather":
					// mainEl.innerHTML = templateWeather();
					break;

				case "User Page":
					if (authorization.loginState.loggedIn) {
						mainEl.innerHTML = templateUserpage(authorization.loginState);
						userpageNav.userpageNav({ userinfo: authorization.loginState }); // can add more data here adding another key if wanted
					} else {
						mainEl.innerHTML = '<div id="userpage-logOut-content">Please login to see your profile!</div>';
					}
					break;

				case "Contact Us":
					mainEl.innerHTML = templateContact();
					break;
			}
		});
	}

};

// Person handling weather can use this later
// weather().then((data) => {
// 	let weatherEl = document.getElementById("weatherBar");
// 	weatherEl.innerHTML = templateWeather(data);
// });