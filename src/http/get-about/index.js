let arc = require('@architect/functions')
let about = require('@architect/views/about')

function index(req) {
  let authorized = req.session && req.session.authorized
  return {
    html: about({authorized})
  }
}

exports.handler = arc.http.async(index)
