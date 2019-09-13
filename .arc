@app
microblog

@aws
profile personal
region us-west-1
bucket brian-west-1

@cdn
@static

@http
# personal auth system
get /
get /about
get /login
post /login
post /logout

# personal publishing system
get /new
get /posts/:postID
post /posts
post /posts/:postID
post /posts/:postID/delete

# webmention endpoint
#post /webmention-endpoint

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
