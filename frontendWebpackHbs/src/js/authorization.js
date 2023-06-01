const apiUrl = "https://localhost:7777/api/";

// They are static because:
// Only one potential logged in user,
// Doesn't make sense to need more than one thing to log people in / out

export default class {

    static loginState = { "loggedIn": false };

    static saveCredentials(token, userid) { //setting localStorage to setItem
        localStorage.setItem("token", token);
        localStorage.setItem("userid", userid);
    }

    static logOut() { // removing localstorage data for logout
        localStorage.removeItem("token"); // pass the key for removal
        localStorage.removeItem("userid");
        this.loginState = { "loggedIn": false }; // resetting user to false login
    }

    static async storedLogin() {
        // /?uid=uid&ch=ch URL for local storage stuff
        let uid = localStorage.getItem("userid");
        let ch = localStorage.getItem("token");
        console.log(uid, ch);

        if (uid != null && ch != null) {

            let loginResult = await fetch(apiUrl + `user/?uid=${uid}&ch=${ch}`);

            let loginResultjson = await loginResult.json(); // processes loginResult into json

            return loginResultjson;
        } else {
            return { "loggedIn": false };
        }

        // if (loginResultjson.loggedIn) {
        //     me.hideLogin();
        //     me.user = loginResultjson.user;
        // }
    }
}