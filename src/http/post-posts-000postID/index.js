let arc = require('@architect/functions')
let auth = require('@architect/shared/auth')
let fatal = require('@architect/shared/fatal')
let data = require('@begin/data')

/**
 * update post
 */
async function update(req) {
  try {
    // note only expect title and body updates rn
    let raw = req.body

    // read the post
    let post = await data.get({
      table: 'posts',
      key: req.params.postID
    })

    // copy raw properties over post properties
    let delta = {...post, ...raw}

    // add modified timestamp
    delta.modified = new Date(Date.now()).toISOString()

    // save the updated post
    await data.set(delta)

    // go to it
    return {
      status: 302,
      location: `/posts/${req.params.postID}?updated`
    }
  }
  catch(err) {
    return fatal(err)
  }
}

exports.handler = arc.http.async(auth, update)
