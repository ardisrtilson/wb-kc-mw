var express = require('express');
var router = express.Router();
var axios = require('axios')
const qs = require('qs');
var getUserToken = require('../scripts/getUserToken.js')
var getUserInfo = require('../scripts/getUserInfo')

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', function requestHandler(req, res) {
  res.send(req.body)
  getUserToken.getUserToken()
  .then(res => getUserInfo.getUserInfo(res, req.body))
});

module.exports = router;