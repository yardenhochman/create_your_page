const Site = require('../models/sites.js');
const Pictures = require('../models/pictures.js');
const generator = require('../services/helper');

const configController = {};

configController.removeSite = (req, res) => {
  console.log(
    `---> Config Controller, removing site`,
    req.params.name,
  );
  Site.removeSite(req.params.name)
    .then(() =>
      res.json({ message: 'site removed' }),
    )
    .catch(err => console.log(err));
};
configController.update = (req, res) => {
  console.log(
    `---> Config Controller, editing site`,
    req.params.name,
  );
  Site.changeSite(req.body)
    .then(site => {
      res.json({
        data: site,
        message: 'site changed',
      });
    })
    .catch(err => console.log(err));
};
configController.generateUpload = (
  req,
  res,
  next,
) => {
  console.log(
    `---> configController, initiliating generator`,
  );
  const uploadDetails = generator();
  res.json({
    data: uploadDetails,
    message: 'request ready',
  });
};

configController.siteNameList = (
  req,
  res,
  next,
) => {
  console.log(
    `---> configController, providing list of existing site names`,
  );
  Site.SiteNames()
    .then(sitelist => {
      res.json({
        data: sitelist,
        message: 'site names served',
      });
    })
    .catch(err => console.log(err));
};

module.exports = configController;

/* 
Roles:
-creates a new website in the DB
-sends back site information for the view

*/
