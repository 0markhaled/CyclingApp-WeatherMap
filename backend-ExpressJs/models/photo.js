const db = require('../modules/db');

module.exports = {

    'addPhoto': async function (profile_image) {
        let conn = await db.getConnection();
        const result = await conn.query(
            "insert into user (profile_image) values ?",
            [profile_image]);

        conn.end();
        return result;
    }

};



