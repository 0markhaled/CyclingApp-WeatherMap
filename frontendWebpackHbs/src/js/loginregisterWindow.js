// Module for login / register form
const apiUrl = "https://localhost:7777/api/";

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

    constructor(loginButton, exitButton, clickOffBg, submitbtn, callback) {
        this.loginBtn = document.getElementById(loginButton);
        this.loginExitbtn = document.getElementById(exitButton);
        this.login = document.getElementById(clickOffBg);
        this.submitLoginBtn = document.getElementById(submitbtn);
        this.callback = callback;
    }

    init() {
        const me = this;
        this.loginBtn.addEventListener('click', function () {
            me.hideLogin(false);
        });

        this.loginExitbtn.addEventListener('click', function () {
            me.hideLogin();
        });

        this.login.addEventListener('click', function (ev) {
            me.modalHide(true, ev.target);
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

            me.callback(loginResultjson);

        });
    }
}