var express = require('express');
var router = express.Router();
var axios = require('axios')
var qs = require('qs');

router.put('/', function requestHandler(req, res) {
  var temp = "a.redford.tilson@gmail.com"
  getToken()
    .then(response => getByEmail(response, temp)
      .then(response => changePassword(response.token.data.access_token, response.res.data[0].id)
        .then(response => console.log(response))
      ))

  res.send(req.body)
});

async function getToken() {

  let config = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  }

  let data = {
    'grant_type': "client_credentials",
    'client_id': "admin-cli",
    'client_secret': "16e6581f-6bad-44b5-b0dc-012d2c77bbc5"
  }

  let url = 'https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/realms/demo-realm/protocol/openid-connect/token'

  let res = await axios.post(url, qs.stringify(data), config
  ).catch(error => console.log(error))

  return res
}

async function getByEmail(token, email) {

  let config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.data.access_token}`
    }
  }

  let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/demo-realm/users?search=${email}`

  let res = await axios.get(url, config).catch(error => console.log(error))

  let info = {
    "res": res,
    "token": token
  }

  return info
}

async function changePassword(token, id) {
  console.log(token)
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  let data = {
    credentials: [
      {
        type: "password",
        temporary: false,
        value: "mintee"
      }
    ]
  }

  let url = `/auth/admin/realms/demo-realm/users/${id}/reset-password`

  let res = await axios.put(url, JSON.stringify(data), config).catch(error => console.log(error))

  return res
}

module.exports = router;