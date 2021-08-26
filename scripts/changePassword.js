var axios = require('axios')
const qs = require('qs');

async function changePassword(token, id, password) {
  console.log(password)
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

exports.changePassword = changePassword;