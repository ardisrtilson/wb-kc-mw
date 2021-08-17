var express = require('express');
var router = express.Router();
var axios = require('axios')
const qs = require('qs');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function requestHandler(req, res) {
  console.log(req.body)
  res.send(req.body)
  getToken().then(res => createUser(res, req.body))
});

async function getToken() {

  let config = {
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }
  
  let data = {
    'grant_type': "client_credentials",
    'client_id': "admin-cli",
    'client_secret': "0f6b574b-821e-47fe-ad58-aa8d6fcf9fbe"
  }

  let url = 'https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/realms/master/protocol/openid-connect/token'

  let res = await axios.post(url, qs.stringify(data), config
  ).catch(error => console.log(error))
  
  return res
}

async function getToken() {

  let config = {
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }
  
  let data = {
    'grant_type': "password",
    'client_id': "admin-cli",
    'username': "admin",
    'password': "44qxQPtkcA"
  }

  let url = 'https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/realms/master/protocol/openid-connect/token'

  let res = await axios.post(url, qs.stringify(data), config
  ).catch(error => console.log(error))
  
  return res
}

async function createUser(token, stats) {

  let config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.data.access_token}`
    }
  }
  
  let data = {"firstName":`${stats.firstName}`,"lastName":`${stats.lastName}`, "email":`${stats.email}`, "enabled":"true", "username":`${stats.username}`}

  let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/${stats.realm}/users`

  await axios.post(url, JSON.stringify(data), config).catch(error => console.log(error))
  
}

module.exports = router;