const db = require('../db/config');
const Pictures = {};
Pictures.insert = ({ id, picture, type }) => {
    return db.one (`
    INSERT INTO pictures(site_id,picture_url,picture_type)
    VALUES ($1, $2, $3) RETURNING *`,
    [id,picture,type])
};

module.exports = Pictures;