const bcrypt = require('bcryptjs');
const Site = require('../models/sites.js');
const Pictures = require('../models/pictures.js');
const classDetails = require('../services/site_class');
const createController = {};

 /*
const AWS = require('aws-sdk'); */



createController.createSite = async (req, res) => {
  console.log(`---> Create Controller`, req.body);
  const site = new SiteDetails(req.body);
  res.locals.type = req.body.profile_type;
  try {
    await Site.createSite({ name, profile_type, facebook, instagram, email, color1, color2, description, occupation, profile_pic, linkedIn, password, picture1, picture2, picture3, twitter });
    res.json({ message: 'new site served' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports = createController;

/* 
Roles:
-creates a new website in the DB
-sends back site information for the view

*/
