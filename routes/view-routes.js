const express = require('express');
const Site = require('../models/sites.js');
const viewRoutes = express.Router();
const viewController = {};

viewController.show = async (req,res) => {
  console.log(`---> View Controller`,req.params.name)
  try {
    const site = await Site.show(req.params.name);
    res.json({ site: site, message: 'site served' });
  }
  catch (error) { res.status(500).json({ error }) };
}

viewRoutes.get('/:name', viewController.show)

module.exports = viewRoutes;