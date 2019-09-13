module.exports = function fatal({err}) {
  let html = `
    <h1>Error</h1>
    <p>${err.message}</p>
    <pre>${err.stack}</pre>
  `
  return {
    status: 500,
    headers: {
      // we do not want to cache errors!
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    html
  }
}
