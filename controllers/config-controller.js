const Site = require('../models/sites.js');
const Pictures = require('../models/pictures.js');
const generator = require('../services/helper');

const configController = {};
const { name } = req.params;

configController.removeSite = async (req, res) => {
  console.log(`---> Config Controller, removing site`,name);
  try {
    await Site.removeSite(name);
    res.json({ message: 'site removed' });
  }
  catch (err) { console.log(err) };
};
configController.update = async (req, res) => {
  console.log(`---> Config Controller, editing site`,name);
  try {
    const site = await Site.changeSite(name);
    res.json({ data: site, message: 'site changed' });
  }
  catch (err) { console.log(err) };
};
configController.generateUpload = async (req,res,next) => {
  console.log(`---> configController, initiliating generator`);
  try {
    const uploadDetails = await generator();
    res.json({ data: uploadDetails, message: 'request ready' });
  }
  catch (error) { console.log(error) };
};

configController.siteNameList = async (req, res, next) => {
  console.log(`---> configController, providing list of existing site names`);
  try {
    const sitelist = await Site.SiteNames();
    res.json({ data: sitelist, message: 'site names served' });
  }
  catch (err) { console.log(err) };
};

module.exports = configController;

/* 
Roles:
-creates a new website in the DB
-sends back site information for the view

*/
