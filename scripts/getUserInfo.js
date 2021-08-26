var axios = require('axios')
const qs = require('qs');

async function getUserInfo(token) {

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

exports.getUserInfo = getUserInfo;