let arc = require('@architect/functions')

async function logout() {
  return {
    session: {authorized: false},
    location: '/'
  }
}

exports.handler = arc.http.async(logout)
