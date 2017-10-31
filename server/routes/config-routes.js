const express = require('express');
const configRoutes = express.Router();
const Site = require('../models/sites');
const configController = {};
    
/* const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password_digest, salt); */


configController.removeSite = (req,res) => {
    console.log(`---> Config Controller, removing site`,req.params.name)
    Site.removeSite(req.params.name)
    .then( () => res.json({message: 'site removed'}))
    .catch( err => console.log(err));
};
configController.update = (req,res) => {
    console.log(`---> Config Controller, editing site`,req.params.name)
    Site.changeSite(req.body)
    .then( site => {
        res.json({
            data: site,
            message: 'site changed'
        })
    }).catch( err => console.log(err));
}

configRoutes.put('/:name', configController.update);
configRoutes.delete('/:name',configController.removeSite)


module.exports = configRoutes;