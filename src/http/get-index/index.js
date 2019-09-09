let arc = require('@architect/functions')
let data = require('@begin/data')
let render = require('@architect/views/index')

async function index(req) {
  let authorized = req.session && req.session.authorized
  let posts = await data.get({table: 'posts'})
  let json = req.query.hasOwnProperty('json')
  if (json) {
    return {
      json: posts
    }
  }
  else {
    return {
      html: render({authorized, posts})
    }
  }
}

exports.handler = arc.http.async(index)
