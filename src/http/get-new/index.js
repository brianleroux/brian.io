let arc = require('@architect/functions')
let auth = require('@architect/shared/auth')
let render = require('@architect/views/new')

async function post() {
  return {
    html: render()
  }
}

exports.handler = arc.http.async(auth, post)
