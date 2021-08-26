var axios = require('axios')
const qs = require('qs');

async function updateUserInfo(token, id, name) {
  console.log(name)
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  let data = {
    firstName: name.firstName,
  }

  let url = `https://keycloak-service-dot-tj-node-server-322619.ue.r.appspot.com/auth/admin/realms/workbay/users/${id}`

  let res = await axios.put(url, JSON.stringify(data), config).catch(error => console.log(error))

  return res
}

exports.updateUserInfo = updateUserInfo;