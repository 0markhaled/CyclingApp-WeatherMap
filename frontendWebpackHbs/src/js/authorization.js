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
        //console.log(uid, ch);

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

    static exValidated = false;
    static validated = false;

    static async validate() {

        if (!this.exValidated) {
            this.exValidated = true;
            const urlQs = new URLSearchParams(window.location.search);
            const code = urlQs.get('code');
            // console.log(code);
            if (code != null) {
                const uid = urlQs.get('uid');
                if (uid != null) {
                    // do a fetch back to the server side with the uid and code(emailHash)
                    const vData = await fetch('/api/user/validate', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ code: code, uid: uid })
                    });
                    const vDataJson = await vData.json();
                    console.log(vDataJson);
                    this.validated = vDataJson.validated;

                }
            }
        }
        return this.validated;
    }
}