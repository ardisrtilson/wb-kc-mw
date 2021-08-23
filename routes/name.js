var express = require('express');
var router = express.Router();
var axios = require('axios')
const qs = require('qs');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.put('/', function requestHandler(req, res) {
  var email = req.body.email
  getToken()
    .then(response => getByEmail(response, email)
      .then(response => updateUser(response.token.data.access_token, response.res.data[0].id, req.body)
      ))
  res.send(req.body)
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

async function updateUser(token, id, name) {
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  let data = {
    firstName: name.firstName,
    lastName: name.lastName
  }

  let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/workbay/users/${id}`

  let res = await axios.put(url, JSON.stringify(data), config).catch(error => console.log(error))

  return res
}

async function getByEmail(token, email) {

  let config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.data.access_token}`
    }
  }

  let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/workbay/users?search=${email}`

  let res = await axios.get(url, config).catch(error => console.log("2"))

  let info = {
    "res": res,
    "token": token
  }

  return info
}

module.exports = router;