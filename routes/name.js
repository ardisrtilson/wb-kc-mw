var express = require('express');
var router = express.Router();
var axios = require('axios')
const qs = require('qs');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.put('/', function requestHandler(req, res) {
  getUserToken(req.body)
    .then(response => getInfo(response.data.access_token))
      .then(response => updateUserAsUser(response.token, response.res.data.sub, req.body))
  res.end(req.body)
});

async function getUserToken(user) {

  let config = {
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }
  
  let data = {
    'client_secret': "b3c3f205-da48-4900-bf30-276ba90eaf83",
    'grant_type': "password",
    'client_id': "workbay-test",
    'password': user.password,
    'username': user.username
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
      "Authorization": `Bearer ${token}`
    }
  }
  
  let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/realms/workbay/protocol/openid-connect/userinfo`

  let res = await axios.get(url, config).catch(error => console.log(error))
  let response = {res: res, token: token}
  return response
  
}

async function updateUserAsUser(token, id, body) {
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  let data = {
    firstName: body.firstName,
    lastName: body.lastName,
    username: body.username
  }

  let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/workbay/users/${id}`

  let res = await axios.put(url, JSON.stringify(data), config).catch(error => console.log(error))

  return res
}

// async function getAdminToken() {

//   let config = {
//     headers: {"Content-Type": "application/x-www-form-urlencoded"}
//     }
  
//   let data = {
//     'grant_type': "client_credentials",
//     'client_id': "admin-cli",
//     'client_secret': "7b80df1a-9699-439d-81a7-f1a3f000db24"
//   }

//   let url = 'https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/realms/workbay/protocol/openid-connect/token'

//   let res = await axios.post(url, qs.stringify(data), config
//   ).catch(error => console.log(error))
  
//   return res
// }

// async function updateUserAsAdmin(token, id, name) {
//   let config = {
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`
//     }
//   }

//   let data = {
//     firstName: name.firstName,
//     lastName: name.lastName,
//     username: name.username
//   }

//   let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/workbay/users/${id}`

//   let res = await axios.put(url, JSON.stringify(data), config).catch(error => console.log(error))

//   return res
// }

// async function getByEmail(token, email) {

//   let config = {
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token.data.access_token}`
//     }
//   }

//   let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/workbay/users?search=${email}`

//   let res = await axios.get(url, config).catch(error => console.log("2"))

//   let info = {
//     "res": res,
//     "token": token
//   }

//   return info
// }

module.exports = router;