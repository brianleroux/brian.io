let arc = require('@architect/functions')
let data = require('@begin/data')
let auth = require('@architect/shared/auth')
let fatal = require('@architect/shared/fatal')
let parse = require('./parse')
let geo = require('./geo')
let slug = require('./slug')
let upload = require('./upload')

async function create(req) {
  try {
    let created = new Date(Date.now()).toISOString()

    // reshape the fugly api gateway req
    let raw = parse(req)
    raw.location = geo(raw.location)
    raw.key = slug(raw.title +' '+ created)
    raw.created = created

    // overwrite photo with filename if uploading
    if (raw.photo) {
      raw.photo = await upload(raw)
    }

    // save the post to the db
    await data.set({table: 'posts', ...raw})

    // head home
    return {
      status: 302,
      location: '/'
    }
  }
  catch(err) {
    return fatal(err)
  }
}

exports.handler = arc.http.async(auth, create)
