export default async (callback) => {

    //fetches from the API, defaults to GET, np need for other parameters
    //this is the location of the server
    let res = await fetch("https://localhost:7777/cycleRoutes") //fetches from the API, defaults to GET, np need for other parameters

    let cycleMarker = await res.json();
    // console.log(bathMarker);
    callback(cycleMarker);

    //  return res.json(); //converts the response to JSON and returns it
}