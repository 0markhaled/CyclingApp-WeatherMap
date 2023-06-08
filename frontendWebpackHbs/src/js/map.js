import L from 'leaflet';
import 'leaflet-routing-machine';

import mariadb from 'mariadb';

const url = "https://localhost:7777/cycleRoutes";

export default class {

    routeDistance;
    routeTime;
    routeName;



    constructor(container, position) {
        this.position = L.latLng(position.latitude, position.longitude);
        this.container = container;
        this.map = L.map(this.container).setView([position.latitude, position.longitude], 10);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);



        this.map.on('click', async (e) => {
            //  console.log(e.latlng);
            await this.drawCycleRoute(this.position, e.latlng);
        });
        this.route = null;

    }

    drawCycleRoute = async (a, b) => {

        if (this.route !== null) {
            this.map.removeControl(this.route);
        }

        let r = L.Routing.control({
            waypoints: [a, b],
            router: L.Routing.mapbox('pk.eyJ1IjoiMG1hcmtoYWxlZCIsImEiOiJjbGljOXhkYWQwYnNpM2drMnpjMTJtNHg5In0.0bWI-t5_xQCSY5Kdd7upTQ',
                { profile: 'mapbox/cycling' }),


        }).addTo(this.map);
        this.route = r;

        this.route.on('routeselected', (e) => {

            console.log(e.route.summary);

            this.routeDistance = e.route.summary.totalDistance;
            this.routeTime = e.route.summary.totalTime;

            let routeHours = Math.floor(this.routeTime / 3600);
            let routeMinutes = Math.floor((this.routeTime % 3600) / 60);
            let formattedTime = routeHours + ' hours ' + routeMinutes + ' minutes';

            let distanceTextbox = document.getElementById("mappage-distance-label");
            let timeTextbox = document.getElementById("mappage-ttcomplete-label");

            distanceTextbox.innerHTML = (this.routeDistance / 1000).toFixed(1) + " km";
            timeTextbox.innerHTML = formattedTime;

        });
    }


    saveRoute = () => {

        routeName = document.getElementById('mappage-routename-area').value;
        const insertRoute = "INSERT INTO route (distance, name, duration) VALUES (?, ?, ?)";
        let btnSaveRoute = document.getElementById("save-btn");


        saveButton.addEventListener('click', () => {
            const routeQuery = "INSERT INTO route (distance, name, duration) VALUES (?, ?, ?)";
            pool.getConnection()
                .then(conn => {
                    conn.query(routeQuery, [routeDistance, routeName, routeTime])
                        .then(() => {
                            console.log('Values inserted successfully.');
                            conn.end();
                        })
                        .catch(err => {
                            console.error('Error occurred during query execution:', err);
                            conn.end();
                        });
                })
                .catch(err => {
                    console.error('Error occurred while connecting to the database:', err);
                });
        });

    };


    clearRoute = () => {

        let btnClearRoute = document.getElementById("clear-btn");
        clearButton.addEventListener('click', () => {
            document.getElementById('mappage-routename-area').value = "";
            document.getElementById('mappage-distance-label').innerHTML = "";
            document.getElementById('mappage-ttcomplete-label').innerHTML = "";

            if (this.route !== null) {
                this.map.removeControl(this.route);
            }

        });




    }
}
