const express = require('express');
const createRoutes = express.Router();
const createController = require('../controllers/create-controller')


createRoutes.post('/1', createController.createSite)


module.exports = createRoutes;