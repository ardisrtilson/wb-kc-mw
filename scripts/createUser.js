var axios = require('axios')
const qs = require('qs');
// const { body, validationResult } = require('express-validator');

async function createUser(token, stats) {

    // console.log(body(stats.password).isLength({ min: 5 }))

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

exports.createUser = createUser;