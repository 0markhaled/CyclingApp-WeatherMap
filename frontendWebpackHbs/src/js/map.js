const url = "https://localhost:7777/cycleRoutes";

export default class {
    constructor(container, position) {
        this.container = container;
        this.map = L.map(this.container).setView([position.latitude, position.longitude], 10);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
    }

    async drawCycleRoutes() {


        for (let i = 0; i < 11; i++) {
            let cycleRoutesData = await fetch(url + `/?offset=${i * 1000}`);
            let cycleRoutes = await cycleRoutesData.json();
            //console.log(cycleRoutes);


            for (const r of cycleRoutes.features) {


                if (r.geometry !== undefined) {
                    if (r.geometry.type === "LineString") {
                        let route = r.geometry.coordinates;
                        let routeLatLng = [];
                        for (let i = 0; i < route.length; i++) {
                            routeLatLng.push([route[i][1], route[i][0]]);
                        }

                        let routeLine = L.polyline(routeLatLng, { color: 'red' }).addTo(this.map);

                    } else {
                        console.log(r.geometry.type, r.geometry);
                    }
                }
            }
        }
    }





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