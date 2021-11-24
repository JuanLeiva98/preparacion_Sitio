var express = require('express');
var router = express.Router();
var user_models = require("./../../models/novedadesModel");




router.get('/', async function (req, res, next) {
    var novedades = await user_models.getNovedades();
        res.render('admin/index-admin', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

module.exports = router;
