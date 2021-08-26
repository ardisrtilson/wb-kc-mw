var jwt_decode = require('jwt-decode');
var express = require('express');
var router = express.Router();
var axios = require('axios')
var qs = require('qs');
var getAdminToken = require('../scripts/getAdminToken.js')

router.get('/', function(req, res, next) {
    getAdminToken.getAdminToken().then(response => {
        const decrypted = jwt_decode(response.data.access_token)
        res.send(decrypted)
    })
});

module.exports = router;