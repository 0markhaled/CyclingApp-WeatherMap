// Styling
import "./css/universal.css";
import "./css/root.css";
import "./css/landing.css";
import "./css/mappage.css";
import "./css/info.css";
import "./css/contact.css";
import "./css/userpage.css";

// Modules
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

appEl.innerHTML = templateRoot(pages);

let mainEl = document.getElementById("root-main");


window.onload = () => {

	mainEl.innerHTML = templateLanding();

	let elsNavLink = document.getElementsByClassName("navigation-li");

	for (let elLink of elsNavLink) {

		elLink.addEventListener('click', function () {
			let page = { name: this.dataset.link };

			// if Home is clicked on it shows the home page and fetches the stuff from the json file
			if (page.name === "Home") {
				mainEl.innerHTML = templateLanding();
			}

			if (page.name === "Map") {
				mainEl.innerHTML = templateMap({});
			}

			if (page.name === "Info") {
				mainEl.innerHTML = templateInfo();
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

	let login = document.getElementById("logindialog-background");

	let loginRegister = document.getElementById("btn-login");
	loginRegister.addEventListener('click', function () {
		login.style.display = "block";
		// mainEl.innerHTML = templateLogin();
	});

	let loginExit = document.getElementById("exitlogin");
	loginExit.addEventListener('click', function () {
		login.style.display = "none";
	});

	login.addEventListener('click', function (ev) {
		if (ev.target === login) {
			login.style.display = "none";
		}
	});
};

// Person handling weather can use this later
// weather().then((data) => {
// 	let weatherEl = document.getElementById("weatherBar");
// 	weatherEl.innerHTML = templateWeather(data);
// });