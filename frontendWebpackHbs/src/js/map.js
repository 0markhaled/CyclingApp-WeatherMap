const url = "https://localhost:7777/cycleRoutes";

export default class {
    constructor(container, position) {
        this.position = L.latLng(position.latitude, position.longitude);
        this.container = container;
        this.map = L.map(this.container).setView([position.latitude, position.longitude], 10);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
        this.map.on('click', async (e) => {
            console.log(e.latlng);
            await this.drawCycleRoute(this.position, e.latlng);
        });
        this.route = null;

    }

    async drawCycleRoute(a, b) {


        if (this.route !== null) {
            this.map.removeControl(this.route);
        }
        //the for loop draws the open data ottawa cycle routes on the map
        // for (let i = 0; i < 11; i++) {
        //     let cycleRoutesData = await fetch(url + `/?offset=${i * 1000}`);
        //     let cycleRoutes = await cycleRoutesData.json();
        //     //console.log(cycleRoutes);


        //     for (const r of cycleRoutes.features) {


        //         if (r.geometry !== undefined) {
        //             if (r.geometry.type === "LineString") {
        //                 let route = r.geometry.coordinates;
        //                 let routeLatLng = [];
        //                 for (let i = 0; i < route.length; i++) {
        //                     routeLatLng.push([route[i][1], route[i][0]]);
        //                 }

        //                 let routeLine = L.polyline(routeLatLng, { color: 'red' }).addTo(this.map);

        //             } else {
        //                 console.log(r.geometry.type, r.geometry);
        //             }
        //         }
        //     }
        // }

        this.route = L.Routing.control({
            waypoints: [
                a, b
            ],
            router: L.Routing.mapbox('pk.eyJ1IjoiMG1hcmtoYWxlZCIsImEiOiJjbGljOXhkYWQwYnNpM2drMnpjMTJtNHg5In0.0bWI-t5_xQCSY5Kdd7upTQ'),
            // Additional routing options if needed
        }).addTo(this.map);
        console.log(this.route);

        // // Add Waypoint Input Control to map
        // L.Routing.control({
        //     waypoints: [],
        //     routeWhileDragging: true,
        //     geocoder: L.Control.Geocoder.nominatim(),
        //     // Add your additional routing options here
        // }).addTo(this.map);



        //     // Create a separate container for the route summary
        //     var routeSummaryContainer = L.DomUtil.create('div', 'route-summary-container');

        //     // Add Route Summary Control to map
        //     L.Routing.control({
        //         waypoints: [],
        //         routeWhileDragging: true,
        //         summaryTemplate: '<div class="route-summary">{totalDistance}, {totalTime}</div>',
        //         containerClassName: 'route-summary-control',
        //         container: routeSummaryContainer,
        //         // Add your additional routing options here
        //     }).addTo(this.map);



        // }







        // let routeHighlight = () => {
        //     console.log("routeHighlight");
        //     let url = "https://localhost:7777/cycleRoutes";

        //     fetch(url)
        //         .then(response => response.json())
        //         .then(data => {
        //             // Extract route information from the JSON data

        //             let geoJson = data;
        //             let layerInfo = {
        //                 id: 'cycling-routes',
        //                 type: 'line',
        //                 source: {
        //                     type: 'geojson',
        //                     data: geoJson
        //                 },
        //                 paint: {
        //                     'line-color': 'red',
        //                     'line-width': 4
        //                 }
        //             }

        //             map.addLayer(layerInfo);
        //         })


        // };


    }
}