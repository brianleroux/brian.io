let arc = require('@architect/functions')
let layout = require('@architect/views/layout')

let body = `
<form action=/login method=post>
  <input type=password name=password placeholder="Enter password here">
  <button type=submit>Login</button>
</form>
`

async function login() {
  return {
    html: layout({body})
  }
}

exports.handler = arc.http.async(login)
