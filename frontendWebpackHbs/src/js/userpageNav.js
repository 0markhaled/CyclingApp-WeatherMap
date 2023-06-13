import userDashboardtemplate from '../hbs/userpage/userpageDashboard.hbs';
import userpageSavedtemplate from '../hbs/userpage/userpageSaved.hbs';
import userpageLogtemplate from '../hbs/userpage/userpageLog.hbs';
import userpageCollectionstemplate from '../hbs/userpage/userpageCollections.hbs';
import userpageSettingstemplate from '../hbs/userpage/userpageSettings.hbs';
import { set } from 'date-fns';
import authorization from './authorization';
import templateUserpage from '../hbs/userpage/userpage.hbs';
import routeUtility from './routeData.js';

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

        userSaved.addEventListener("click", async function () {
            data.routes = await routeUtility.getRoutes();
            userpageContainer.innerHTML = userpageSavedtemplate(data);
            console.log(data.routes);

        });

        userpageLog.addEventListener("click", function () {
            userpageContainer.innerHTML = userpageLogtemplate(data);
        });

        userpageCollections.addEventListener("click", function () {
            userpageContainer.innerHTML = userpageCollectionstemplate(data);
        });

        let mainEl = document.getElementById("root-main");
        let reloadUserpage = async () => {
            await authorization.reloadLogin();
            mainEl.innerHTML = templateUserpage(authorization.loginState);
            this.userpageNav({ userinfo: authorization.loginState });
        };
        userpageSettings.addEventListener("click", function () {
            userpageContainer.innerHTML = userpageSettingstemplate(data);
            let btnUserEdit = document.getElementById('btn-user-edit');
            let photoFileEl = document.getElementById('photo');
            let editButtonEls = document.getElementsByClassName('user-edit');
            for (let el of editButtonEls) {
                el.addEventListener('click', async () => {
                    const field = el.dataset.field
                    const val = document.getElementById(field).value;
                    console.log('field,val', field, val);
                    const requestData = {
                        'value': val
                    }
                    let uid = localStorage.getItem('userid');
                    let ch = localStorage.getItem('token');

                    let result = await fetch(`api/user/edit/${field}?uid=${uid}&ch=${ch}`, {
                        'method': 'POST',
                        'body': JSON.stringify(requestData),
                        'headers': {
                            'Content-Type': 'application/json'
                        }
                    });
                    await reloadUserpage();
                });
            }


            btnUserEdit.addEventListener('click', async () => {
                const photoFile = photoFileEl.files[0];
                console.log(photoFile, photoFileEl);
                const formData = new FormData();
                formData.append('photo', photoFile);
                let uid = localStorage.getItem('userid');
                let ch = localStorage.getItem('token');
                let result = await fetch(`api/user/edit/photo?uid=${uid}&ch=${ch}`, {
                    'method': 'POST',
                    'body': formData
                });
                let resultJson = await result.json();
                if (!resultJson.success) {
                    if (resultJson.deleted) {
                        let profileimage = document.getElementById('userpage-userthumb');
                        profileimage.src = '';
                        let profileimage2 = document.getElementById('userpageSettings-profileimage');
                        profileimage2.src = '';
                        await reloadUserpage();
                    } else {
                        alert('Error uploading:\n' + resultJson.message);
                    }
                }
                else {
                    let profileimage = document.getElementById('userpage-userthumb');
                    profileimage.src = '/img/' + resultJson.filename;
                    let profileimage2 = document.getElementById('userpageSettings-profileimage');
                    profileimage2.src = '/img/' + resultJson.filename;
                    await reloadUserpage();
                }
            });
        });
    }
}
