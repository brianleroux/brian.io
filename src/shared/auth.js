module.exports = async function authorized(req) {
  return req.session.authorized? null : {
    location: '/login?notauthorized'
  }
}
