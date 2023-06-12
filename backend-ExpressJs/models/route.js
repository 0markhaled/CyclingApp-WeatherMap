const db = require("../modules/db");
const user = require("./user");


module.exports = {

    'saveRoute': async function (name, distance, duration, points, user_id) {
        let conn = await db.getConnection();
        console.log(name, distance, duration, user_id);
        const result = await conn.query(
            "INSERT INTO route (name, distance, duration, route_points, user_id) VALUES (?, ?, ?, ?, ?)",
            [name, distance, duration, points, user_id]);
        conn.end();
        return { message: 'route saved' };
    },

    'fetchRoute': async function (user_id) {
        let conn = await db.getConnection();
        const result = await conn.query("SELECT (name, distance, duration, route_points) FROM route WHERE user_id = ?", [user_id]);
        conn.end();
        return result;
    },

    'clearRoute': async function (user_id) {
        let conn = await db.getConnection();
        const result = await conn.query("DELETE FROM * route WHERE user_id = ?", [user_id]);
        conn.end();
        return result;
    }





}