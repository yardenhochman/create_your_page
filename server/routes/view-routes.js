const express = require('express');
const Site = require('../models/sites.js');
const viewRoutes = express.Router();
const viewController = {};

viewController.show = (req,res) => {
    console.log(`---> View Controller`,req.params.name)
    Site.show(req.params.name).then( site => {
      console.log(site)
      res.json({
        site: site,
        message: 'site served'
      })
    }).catch( err => {
      console.log(err);
      res.status(500).json({error:err});
    });
  }


viewRoutes.get('/:name', viewController.show)

module.exports = viewRoutes;