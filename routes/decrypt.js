var jwt_decode = require('jwt-decode');
var express = require('express');
var router = express.Router();
var axios = require('axios')
var qs = require('qs');

router.get('/', function(req, res, next) {
    getToken().then(response => {
        const decrypted = jwt_decode(response.data.access_token)
        res.send(decrypted)
    })
});

module.exports = router;

async function getToken() {

    let config = {
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
      }
    
    let data = {
      'grant_type': "password",
      'client_id': "admin-cli",
      'username': "swifty",
      'password': "minty"
    }
  
    let url = 'https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/realms/demo-realm/protocol/openid-connect/token'
  
    let res = await axios.post(url, qs.stringify(data), config
    ).catch(error => console.log(error))
    
    return res
  }