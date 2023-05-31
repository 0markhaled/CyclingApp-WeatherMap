// Module for login / register form
const apiUrl = "https://localhost:7777/api/";

// templates
import successfulRegister from '../hbs/registersuccessful.hbs';

// ApiURL for register POST "https://localhost:7777/api/user/register";

export default class {

    // Hides or shows entire login window
    hideLogin(hide) {
        if (hide === undefined) {
            hide = true;
        }

        if (hide) {
            this.login.style.display = "none";
        } else {
            this.login.style.display = "block";
        }
    }

    // Allows user to click off to hide Login/ register window
    modalHide(hide, source) {
        if (source === this.login) {
            this.hideLogin(hide);
        }
    }

    // constructor for login
    constructor(loginButton, exitButton, clickOffBg, submitbtn, registerbtn, loginCallback, registerCallback) {
        this.loginBtn = document.getElementById(loginButton);
        this.loginExitbtn = document.getElementById(exitButton);
        this.login = document.getElementById(clickOffBg);
        this.submitLoginBtn = document.getElementById(submitbtn);
        this.registerBtn = document.getElementById(registerbtn);
        this.loginCallback = loginCallback;
        this.registerCallback = registerCallback;
    }

    init() {
        const me = this;
        // Login button
        this.loginBtn.addEventListener('click', function () {
            me.hideLogin(false);
        });

        // Login exit button
        this.loginExitbtn.addEventListener('click', function () {
            me.hideLogin();
        });

        // modal background, if you click on it, the whole thing disappears
        this.login.addEventListener('click', function (ev) {
            me.modalHide(true, ev.target);
        });

        // Register form
        this.registerBtn.addEventListener("click", async function () {

            let userInfo = { // keys of user info object, putting all the user info into one object, userInfo
                userFirst: document.getElementById("firstname").value,
                userLast: document.getElementById("lastname").value,
                userEmail: document.getElementById("email").value,
                userUsername: document.getElementById("username").value,
                registerPassword: document.getElementById("register-password").value
            }

            // // this does the fetch request
            //https://localhost:7777/apiv
            let registerResult = await fetch(apiUrl + "user/register", {
                method: "POST", // listing method to use (others are like GET, POST, PUT, DELETE, etc)
                headers: { // type of information passed with this request, have to pass the information we're capturing from an element
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo) // converting userInfo into a string
            });

            let registerResultjson = await registerResult.json(); // processes registerResult into json


            if (registerResultjson.username != undefined && registerResultjson.username != null) {
                document.getElementById("register-form").innerHTML = successfulRegister(registerResultjson);
            }

            me.registerCallback(registerResultjson);

            //let re = await user.addUser(req.body.username, req.body.email, req.body.password, req.body.last, req.body.first, req.body.profile_image);


            // let loginResultjson = await loginResult.json(); // processes loginResult into json

            // if (loginResultjson.loggedIn) {
            //     me.hideLogin();
            //     me.user = loginResultjson.user;
            // }

            // me.loggedIn = loginResultjson.loggedIn;

            // me.callback(loginResultjson);

        });

        this.submitLoginBtn.addEventListener("click", async function () {
            let loginEmail = document.getElementById("loginEmail").value;
            let loginPassword = document.getElementById("login-password").value;
            console.log(loginEmail, loginPassword);

            // this does the fetch request
            let loginResult = await fetch(apiUrl + `user/?username=${loginEmail}&password=${loginPassword}`);

            let loginResultjson = await loginResult.json(); // processes loginResult into json

            if (loginResultjson.loggedIn) {
                me.hideLogin();
                me.user = loginResultjson.user;
            }

            me.loggedIn = loginResultjson.loggedIn;

            me.loginCallback(loginResultjson);

        });
    }
}