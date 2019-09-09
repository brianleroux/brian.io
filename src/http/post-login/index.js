let arc = require('@architect/functions')

async function login(req) {
  let authorized = req.body.password === process.env.PASSWORD
  return {
    session: {authorized},
    location: authorized? '/' : '/login?failed'
  }
}

exports.handler = arc.http.async(login)
