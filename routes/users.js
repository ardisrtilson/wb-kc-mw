var express = require('express');
var router = express.Router();
var axios = require('axios')
const qs = require('qs');
const { body, validationResult } = require('express-validator');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/', function requestHandler(req, res) {
  getToken().then(response => createUser(response, req.body))
  .then(response => getByEmail(response.token.data.access_token, response.stats.email, response.stats))
  .then(response => changePassword(response.token, response.info.res.data[0].id, response.body.password))
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
  ).catch(error => console.log("1"))
  
  return res
}

async function createUser(token, stats) {

  console.log(body(stats.password).isLength({ min: 5 }))

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
        value: `${stats.password}`
  }
]}

  let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/workbay/users`

  let response = await axios.post(url, JSON.stringify(data), config).catch(error => console.log("2"))
  return {response, token, stats}
}

async function getByEmail(token, email, body) {

  let config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/workbay/users?search=${email}`

  let res = await axios.get(url, config).catch(error => console.log("5"))

  console.log(res.data[0].id)
  let info = {
    "res": res,
    "token": token
  }

  return {token, info, body}
}

async function changePassword(token, id, password) {
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  let data = {
        type: "password",
        temporary: false,
        value: password
  }

  let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/workbay/users/${id}/reset-password`

  let res = await axios.put(url, JSON.stringify(data), config).catch(error => console.log("4"))

  return res
}

module.exports = router;