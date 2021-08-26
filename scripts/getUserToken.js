var axios = require('axios')
const qs = require('qs');

async function getUserToken(user) {

  let config = {
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }
  
  let data = {
    'client_secret': "7b80df1a-9699-439d-81a7-f1a3f000db24",
    'grant_type': "password",
    'client_id': "admin-cli",
    'password': user.password,
    'username': user.username
  }

  let url = 'https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/realms/workbay/protocol/openid-connect/token'

  let res = await axios.post(url, qs.stringify(data), config
  ).catch(error => console.log(error))
  
  return res
}

exports.getUserToken = getUserToken;