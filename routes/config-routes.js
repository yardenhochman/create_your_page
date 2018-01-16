const express = require('express');
const configRoutes = express.Router();
const configController = require('../controllers/config-controller');

configRoutes.put('/:name',configController.update,);
configRoutes.delete('/:name',configController.removeSite);
configRoutes.get('/request',configController.generateUpload,);
configRoutes.get('/names',configController.siteNameList,);

module.exports = configRoutes;
