/**
 * Example post:
 *
 * {
 *   "photo": "hey-hey-2019-09-07t03-04-36400z.png",
 *   "location": [
 *     -122.4194,
 *     37.7749
 *   ],
 *   "created": "2019-09-07T03:04:36.400Z",
 *   "title": "hey hey",
 *   "body": "my my",
 *   "key": "hey-hey-2019-09-07t03-04-36400z",
 *   "table": "posts"
 * }
 */

/**
 * renders edit post form
 *
 * @param {object} post
 * @param {string} post.key
 * @param {string} post.title
 * @param {string} post.body
 * @param {string} post.photo
 * @param {array} post.location
 * @param {string} post.created
 */
module.exports = function render(post) {
  return `
  <form method=post action=/posts/${post.key}>
    <input type=text name=title placeholder=Title value=${post.title}>
    <textarea name=body>${post.body}</textarea>
    <button type=submit>Save</button>
  </form>
  `
}
