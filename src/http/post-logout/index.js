let arc = require('@architect/functions')

exports.handler = arc.http.async(logout)

async function logout() {
  return {
    location: '/',
    session: {authorized: false}
  }
}
