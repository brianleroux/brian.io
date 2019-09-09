let layout = require('./layout')
let post = require('./_post')

/**
 * renders index.html
 *
 * @param {object} params
 * @param {boolean} params.authorized
 * @param {array} params.posts
 */
module.exports = function render({authorized, posts}) {
  let body = `
    <h1>Recent posts</h1>
    ${posts.map(post).join('')}
  `.trim()
  return layout({authorized, body})
}
