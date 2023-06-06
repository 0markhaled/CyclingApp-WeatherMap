import userDashboardtemplate from '../hbs/userpage/userpageDashboard.hbs';
import userpageSavedtemplate from '../hbs/userpage/userpageSaved.hbs';
import userpageLogtemplate from '../hbs/userpage/userpageLog.hbs';
import userpageCollectionstemplate from '../hbs/userpage/userpageCollections.hbs';

export default class {

    static userpageNav() {
        let userpageContainer = document.getElementById("userpage-display-container");
        let userDashboard = document.getElementById("userpage-nav-dashboard");
        let userSaved = document.getElementById("userpage-nav-saved");
        let userpageLog = document.getElementById("userpage-nav-log");
        let userpageCollections = document.getElementById("userpage-nav-collections");

        userDashboard.addEventListener("click", function () {
            userpageContainer.innerHTML = userDashboardtemplate();
        });

        userSaved.addEventListener("click", function () {
            userpageContainer.innerHTML = userpageSavedtemplate();
        });

        userpageLog.addEventListener("click", function () {
            userpageContainer.innerHTML = userpageLogtemplate();
        });

        userpageCollections.addEventListener("click", function () {
            userpageContainer.innerHTML = userpageCollectionstemplate();
        });
    }
}
