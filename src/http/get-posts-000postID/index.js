let arc = require('@architect/functions')
let data = require('@begin/data')
let render = require('@architect/views/post')
let fatal = require('@architect/shared/fatal')

async function post(req) {
  let authorized = req.session && req.session.authorized
  try {
    let table = 'posts'
    let key = req.params.postID
    let edit = req.query.hasOwnProperty('edit')
    let post = await data.get({table, key})
    if (authorized)
      post.authorized = true
    return render({authorized, edit, post})
  }
  catch(err) {
    return fatal({authorized, err})
  }
}

exports.handler = arc.http.async(post)
