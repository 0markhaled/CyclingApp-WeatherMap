import L from 'leaflet';
import 'leaflet-routing-machine';


const url = "https://localhost:7777/cycleRoutes";

export default class {

    routeDistance;
    routeTime;
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
            waypoints: [
                a, b
            ],
            router: L.Routing.mapbox('pk.eyJ1IjoiMG1hcmtoYWxlZCIsImEiOiJjbGljOXhkYWQwYnNpM2drMnpjMTJtNHg5In0.0bWI-t5_xQCSY5Kdd7upTQ', { profile: 'mapbox/cycling' }),


        }).addTo(this.map);
        // this.route = r;


        this.route.on('routeselected', (e) => {

            console.log(e.route.summary);

            routeDistnace = e.route.summary.totalDistance;
            routeTime = e.route.summary.totalTime;
        });


        let trial = document.getElementsByClassName("leaflet-routing-alt ").length;
        console.log(trial);


        // console.log(obj.getSelectedRoute());
        //console.log(r['_selectedRoute']);

        // console.log(Object.getOwnPropertyNames(this.route));





    }

    // HighlightBikePaths() {

    //     var bikePathsLayer = L.geoJson(null, {
    //         style: {
    //             color: '#FF0000', // Set the color of the bike paths
    //             weight: 3 // Set the width of the bike paths
    //         }
    //     }).addTo(this.map);

    //     // Assume 'response' is the routing response received from Mapbox Cycle Routing Engine

    //     // Extract the bike paths from the response
    //     var bikePaths = response.routes[0].geometry.coordinates;

    //     // Convert the bike paths to GeoJSON
    //     var bikePathsGeoJSON = {
    //         type: 'Feature',
    //         properties: {},
    //         geometry: {
    //             type: 'LineString',
    //             coordinates: bikePaths
    //         }
    //     };

    //     // Add the bike paths to the 'bikePathsLayer'
    //     bikePathsLayer.addData(bikePathsGeoJSON);
    //     var roadStyle = {
    //         color: '#000000', // Set the color of the roads
    //         weight: 2 // Set the width of the roads
    //     };

    //     // Create a new layer for roads
    //     var roadsLayer = L.geoJson(null, {
    //         style: roadStyle
    //     }).addTo(this.map);
    // }





}