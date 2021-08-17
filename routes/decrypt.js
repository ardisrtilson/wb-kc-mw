var jwt_decode = require('jwt-decode');
var express = require('express');
var router = express.Router();
var axios = require('axios')
var qs = require('qs');

router.get('/', function(req, res, next) {
    getToken().then(response => {
        res.send('fsaf')
        const decrypted = jwt_decode(response.data.access_token)
        console.log(decrypted)
    })
});

module.exports = router;

// var token = "eyJ0eXAiO.../// jwt token";
// var decoded = jwt_decode(token);

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

// console.log(decoded);
 
/* prints:
 * { foo: "bar",
 *   exp: 1393286893,
 *   iat: 1393268893  }
 */
 
// decode header by passing in options (useful for when you need `kid` to verify a JWT):
// var decodedHeader = jwt_decode(token, { header: true });
// console.log(decodedHeader);
 
/* prints:
 * { typ: "JWT",
 *   alg: "HS256" }
 */