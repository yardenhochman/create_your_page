const db = require('../db/config');
const Site = {};

Site.createSite = (data) => {
  const {name,profile_type,facebook,instagram,email,color1,color2,description,occupation,profile_pic,linkedIn,password,picture1,picture2,picture3,twitter} = data
  return db.one (`
    INSERT INTO sites
    (name,profile_type,facebook,instagram,email,color1,color2,description,occupation,profile_pic,linkedIn,password,picture1,picture2,picture3,twitter)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
    RETURNING *`,
  [name,profile_type,facebook,instagram,email,color1,color2,description,occupation,profile_pic,linkedIn,password,picture1,picture2,picture3,twitter])
};

Site.show = name => {
  return db.query(`
  SELECT * FROM sites
  WHERE name = $1`,
  name)
};

Site.removeSite = name => {
  return db.none(`
  DELETE FROM sites
  WHERE name = $1`,
  name)
};

Site.changeSite = (site) => {
  const {name,profile_type,facebook,instagram,email,color1,color2,description,occupation} = site  
  return db.one(`
  UPDATE sites SET
  profile_type = $2,
  facebook = $3,
  instagram = $4,
  email = $5,
  color1 = $6,
  color2 = $7,
  description = $8,
  occupation = $9,
  WHERE name = $1
  RETURNING *`,
  [name,profile_type,facebook,instagram,email,color1,color2,description,occupation])
};


module.exports = Site;