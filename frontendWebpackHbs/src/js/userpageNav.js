import userDashboardtemplate from '../hbs/userpage/userpageDashboard.hbs';
import userpageSavedtemplate from '../hbs/userpage/userpageSaved.hbs';
import userpageLogtemplate from '../hbs/userpage/userpageLog.hbs';
import userpageCollectionstemplate from '../hbs/userpage/userpageCollections.hbs';
import userpageSettingstemplate from '../hbs/userpage/userpageSettings.hbs';

export default class {

    static userpageNav(data) {
        let userpageContainer = document.getElementById("userpage-display-container");
        let userDashboard = document.getElementById("userpage-nav-dashboard");
        let userSaved = document.getElementById("userpage-nav-saved");
        let userpageLog = document.getElementById("userpage-nav-log");
        let userpageCollections = document.getElementById("userpage-nav-collections");
        let userpageSettings = document.getElementById("userpage-nav-settings");

        userDashboard.addEventListener("click", function () {
            userpageContainer.innerHTML = userDashboardtemplate(data);
        });

        userSaved.addEventListener("click", function () {
            userpageContainer.innerHTML = userpageSavedtemplate(data);
        });

        userpageLog.addEventListener("click", function () {
            userpageContainer.innerHTML = userpageLogtemplate(data);
        });

        userpageCollections.addEventListener("click", function () {
            userpageContainer.innerHTML = userpageCollectionstemplate(data);
        });

        userpageSettings.addEventListener("click", function () {
            userpageContainer.innerHTML = userpageSettingstemplate(data);
        });
    }
}
