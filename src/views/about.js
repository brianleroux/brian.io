let fs = require('fs')
let path = require('path')
let layout = require('./layout')
let html = fs.readFileSync(path.join(__dirname, 'about.html')).toString()

module.exports = function about({authorized}) {
  return layout({body: html, authorized: !!authorized})
}
