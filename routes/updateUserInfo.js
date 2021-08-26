var express = require('express');
var router = express.Router();
var axios = require('axios')
const qs = require('qs');

var getAdminToken = require('../scripts/getAdminToken.js')
var getByEmail = require('../scripts/getByEmail.js')
var updateUserInfo = require('../scripts/updateUserInfo.js')

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.put('/', function requestHandler(req, res) {
  getAdminToken.getAdminToken()
    .then(response => getByEmail.getByEmail(response.data.access_token, req.body.email)
      .then(response => updateUserInfo.updateUserInfo(response.token, response.info.res.data[0].id, req.body)
      ))
  res.send(req.body)
});

module.exports = router;