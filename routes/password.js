var express = require('express');
var router = express.Router();

router.put('/', function requestHandler(req, res) {
    res.send(req.body)
    getToken().then(response => {
        const decrypted = jwt_decode(response.data.access_token)
        changePassword(response, decrypted.id, req.body)})
    }
  );

  router.get('/', function(req, res, next) {
    getToken().then(response => {

        res.send(decrypted)
    })
});

  async function getToken() {

  let config = {
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
  }
  
  let data = {
    'grant_type': "client_credentials",
    'client_id': "admin-cli",
    'client_secret': "16e6581f-6bad-44b5-b0dc-012d2c77bbc5"
  }

  let url = 'https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/realms/master/protocol/openid-connect/token'

  let res = await axios.post(url, qs.stringify(data), config
  ).catch(error => console.log(error))
  
  return res
}

async function changePassword(token, stats) {

    let config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.data.access_token}`
      }
    }
    
    let data = {"type":`${stats.type}`,"temporary":`${stats.temporary}`, "value":`${stats.value}`}
  
    let url = `/auth/admin/realms/demo-realm/users/{id}/reset-password`
  
    await axios.post(url, JSON.stringify(data), config).catch(error => console.log(error))
    
  }

module.exports = router;