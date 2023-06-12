import L from 'leaflet';
import 'leaflet-routing-machine';

//import mariadb from 'mariadb';

const url = "https://localhost:7777/cycleRoutes";

export default class {

    routeDistance;
    routeTime;
    routeName;
    // savedRoutes = [];

    //selectedRoute = null; //this is so i can use (e) which the result of the onselectroute in the saveroute method



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

        this.clearRoute();

        let btnSaveRoute = document.getElementById("save-btn");


        btnSaveRoute.addEventListener('click', async () => {

            await this.saveRoute();

        });
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

            this.selectedRoute = e; //this matches with the init variable on the top, (e) is assigned to it, so icant use it
            //outside of this function
            // console.log(this);
            // console.log(e.route.coordinates);
            // console.log(this.selectedRoute.route.coordinates);

            this.routeDistance = e.route.summary.totalDistance;
            this.routeTime = e.route.summary.totalTime;


            let routeHours = Math.floor(this.routeTime / 3600);
            let routeMinutes = Math.floor((this.routeTime % 3600) / 60);
            let formattedTime = routeHours + ' hours ' + routeMinutes + ' minutes';

            let distanceTextbox = document.getElementById("mappage-distance-label");
            let timeTextbox = document.getElementById("mappage-ttcomplete-label");

            distanceTextbox.innerHTML = (this.routeDistance / 1000).toFixed(1) + " km";
            timeTextbox.innerHTML = formattedTime;


            //this saves the route to an object after it was generated by mapbox



        });
    }


    saveRoute = async () => {

        console.log(this.selectedRoute.route.coordinates);
        const route = this.selectedRoute.route.coordinates;
        this.routeName = document.getElementById('mappage-routename-area').value;
        const uid = localStorage.getItem('userid');
        const ch = localStorage.getItem('token');
        const payload = {
            route: {
                name: this.routeName,
                distance: this.routeDistance,
                time: this.routeTime,
                points: route,
            }
        };
        let result = await fetch(`api/routes/?uid=${uid}&ch=${ch}`, {
            'method': 'POST',
            'body': JSON.stringify(payload),
            'headers': {
                'Content-Type': 'application/json'

            }

        });
        console.log(result.message);



        // if (this.selectedRoute) {
        //     let savedRoute = {
        //         //selected route is (e) from the function above
        //         waypoints: selectedRoute.route.waypoints,
        //         distance: selectedRoute.route.summary.totalDistance,
        //         duration: selectedRoute.route.summary.totalTime,
        //         name: document.getElementById('mappage-routename-area').value
        //     }
        //     this.savedRoutes.push(savedRoute); //adds the object to the array
        // }
    };


    clearRoute = () => {

        let btnClearRoute = document.getElementById("clear-btn");


        btnClearRoute.addEventListener('click', () => {
            document.getElementById('mappage-routename-area').value = "";
            document.getElementById('mappage-distance-label').innerHTML = "";
            document.getElementById('mappage-ttcomplete-label').innerHTML = "";

            if (this.route !== null) {
                this.map.removeControl(this.route);
            }

        });




    }
}
