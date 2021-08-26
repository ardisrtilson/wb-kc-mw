var express = require('express');
var router = express.Router();
var getAdminToken = require('../scripts/getAdminToken.js')
var getByEmail = require('../scripts/getByEmail.js')
var changePassword = require('../scripts/changePassword.js')

router.put('/', function requestHandler(req, res) {
  getAdminToken.getAdminToken()
    .then(response => getByEmail.getByEmail(response.data.access_token, req.body.email)
      .then(response => changePassword.changePassword(response.token, response.info.res.data[0].id, req.body.value)
      ))
  res.send(req.body)
});

module.exports = router;