let layout = require('./layout')
let render = require('./_post')
let editable = require('./_form')

module.exports = function renderPost({authorized, edit, post}) {
  // if we find a post and its prod we should cache it for a day.. max-age=86400
  if (authorized && edit && post) {
    return {
      html: layout({authorized, body: editable(post)})
    }
  }
  else if (post) {
    return {
      html: layout({authorized, body: render(post)})
    }
  }
  else {
    return {
      status: 404,
      html: layout({authorized, body: 'Post not found!'})
    }
  }
}
