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
  console.log(req.body.id)
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
    'client_secret': "7b80df1a-9699-439d-81a7-f1a3f000db24"
  }

  let url = 'https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/realms/workbay/protocol/openid-connect/token'

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
  
  let data = {firstName:`${stats.firstName}`,
              lastName:`${stats.lastName}`, 
              email:`${stats.email}`, 
              enabled:true, 
              username:`${stats.username}`, 
              credentials: [
  {
        type: "password",
        temporary: false,
        value: "mintee"
  }
]}

  let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/workbay/users`

  await axios.post(url, JSON.stringify(data), config).catch(error => console.log(error))
  
}

module.exports = router;