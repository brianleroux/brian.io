let fs = require('fs')
let path = require('path')

let hcard = fs.readFileSync(path.join(__dirname, 'h-card.html')).toString()
let css = fs.readFileSync(path.join(__dirname, 'index.css')).toString().replace(/\s{2,}/g, ' ')

/**
 * @param {object} props
 * @param {boolean} props.authorized
 * @param {string} props.body
 */
module.exports = function layout(props={}) {

  let login = `
    <a href=/login>Login</a>`

  let logout = `
  <form method=post action=/logout>
    <button type=submit>Logout</button>
  </form>`

  let post = `<a href=/new>Post</a>`

  return `<!doctype html>
<html lang=en>
<head>
  <title>microblog</title>
  <meta charset=utf-8>
  <meta name=viewport content=width=device-width,initial-scale=1,shrink-to-fit=no>
  <link rel=icon href=/leroux.jpg>
  <link rel=apple-touch-icon-precomposed href=/leroux.jpg> <!-- 🙄 -->
  <style>${css}</style>
</head>
<body>
<header>
  ${hcard}
  <nav>
    ${props.authorized? logout : login}
    ${props.authorized? post : ''}
    <a href=/about>About</a>
  </nav>
</header>
<main>
  <section>${props.body || ''}</section>
</main>
<footer>
  <a href=https://github.com/brianleroux/microblog>view source</a>
</footer>
</body>
</html>
`
}
