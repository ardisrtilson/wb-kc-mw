var axios = require('axios')
const qs = require('qs');

async function getByEmail(token, email, body) {

    let config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/workbay/users?search=${email}`
  
    let res = await axios.get(url, config).catch(error => console.log(error))
    console.log(res)
    let info = {
      "res": res,
      "token": token
    }
  
    return {token, info, body}
  }

  exports.getByEmail = getByEmail;

