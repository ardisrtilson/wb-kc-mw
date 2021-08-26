var express = require('express');
var router = express.Router();
var getAdminToken = require('../scripts/getAdminToken.js')
var createUser = require('../scripts/createUser.js')
var getByEmail = require('../scripts/getByEmail.js')
var changePassword = require('../scripts/changePassword.js')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', function requestHandler(req, res) {
  getAdminToken.getAdminToken()
  .then(response => createUser.createUser(response, req.body))
  .then(response => getByEmail.getByEmail(response.token.data.access_token, response.stats.email, response.stats))
  .then(response => changePassword.changePassword(response.token, response.info.res.data[0].id, response.body.password))
  res.send(req.body)
});

module.exports = router;