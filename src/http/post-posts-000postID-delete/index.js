let arc = require('@architect/functions')
let auth = require('@architect/shared/auth')
let fatal = require('@architect/shared/fatal')
let data = require('@begin/data')

/**
 * destroy a post
 */
async function destroy(req) {
  try {
    await data.destroy({
      table: 'posts',
      key: req.params.postID
    })
    return {
      status: 302,
      location: '/?destroyed'
    }
  }
  catch(err) {
    return fatal(err)
  }
}

exports.handler = arc.http.async(auth, destroy)
