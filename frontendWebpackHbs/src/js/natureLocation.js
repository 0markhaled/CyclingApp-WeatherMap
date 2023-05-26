export default async (callback) => {
    let res = await fetch("https://localhost:7777/geo/ottawa/nature") 
    let parkMark = await res.json();
    callback(parkMark);
}