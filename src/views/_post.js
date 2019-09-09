let marked = require('marked')

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
 * renders a post
 *
 * @param {object} post
 * @param {string} post.title
 * @param {boolean} post.authorized
 * @param {string} post.body
 * @param {string} post.photo
 * @param {array} post.location
 * @param {string} post.created
 */
module.exports = function render(post) {
  // if there is a photo render that
  if (post.photo)
    return photo(post)
  // if there is a title and body its an article
  if (post.title && post.body)
    return article(post)
  // otherwise a note!
  return note(post)
}

function photo(post) {
  let title =  post.title? `<h2 class="p-name">${post.title}</h2>`:''
  let content = post.body? `<p class="p-content">${post.body}</p>`:''
  return `
<section class="photo h-entry">
  <img class=u-photo src=/_static/${post.photo}>
  <aside>
  ${title}
  ${content}
  ${permalink(post)}
  </aside>
</section>`
}

function article(post) {
  return `
<article class="article h-entry">
  <h1 class=p-name>${post.title}</h1>
  ${permalink(post)}
  <section class=e-content>${marked(post.body)}</section>
</article>`
}

function note(post) {
  return `
<section class="note h-entry">
  ${permalink(post)}
  <p class="p-name p-content">${post.content || post.title}</p>
</section>`
}

function permalink(post) {
  let link = `<a href=/posts/${post.key}>${published(post.created)}</a>`
  if (post.authorized) {
    link += `
      <a href=/posts/${post.key}?edit>Edit</a>
      <form 
        onsubmit="return confirm('destroy ${post.title} forever?')" 
        action=/posts/${post.key}/delete 
        method=post>
        <button type=submit>destroy</button>
      </form>
    `
  }
  return link
}

function published(dt) {
  let created = new Date(dt)
  let friendly = created.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    timeZone: 'America/Los_Angeles'
  })
  return `<time class=dt-published datetime=${dt}>${friendly}</time>`
}
