const express = require('express');
const createRoutes = express.Router();
const createController = require('../controllers/create-controller')
/* const imageSender = require('../services/helper')
 */

createRoutes.post('/1', createController.createSite)
/* createRoutes.post('/pic', imageSender, createController.findPic) */


module.exports = createRoutes;