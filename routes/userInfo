var express = require('express');
var router = express.Router();
var axios = require('axios')
const qs = require('qs');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', function requestHandler(req, res) {
  res.send(req.body)
  getToken().then(res => getInfo(res, req.body))
});

async function getToken() {

  let config = {
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }
  
  let data = {
    'client_secret': "7b80df1a-9699-439d-81a7-f1a3f000db24",
    'grant_type': "password",
    'client_id': "admin-cli",
    'password': "minter",
    'username': "a.redford.tilson@gmail.com"
  }

  let url = 'https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/realms/workbay/protocol/openid-connect/token'

  let res = await axios.post(url, qs.stringify(data), config
  ).catch(error => console.log(error))
  
  return res
}

async function getInfo(token) {

  let config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.data.access_token}`
    }
  }
  
  let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/realms/workbay/protocol/openid-connect/userinfo`

  let res = await axios.get(url, config).catch(error => console.log(error))
  console.log(res)
  return res
  
}

module.exports = router;