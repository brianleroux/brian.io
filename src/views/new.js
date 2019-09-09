let layout = require('./layout')

/**
 * renders the new post form
 */
module.exports = function render() {
  return layout({authorized: true, body: `
  <form method=post action=/posts enctype=multipart/form-data>
    <input type=text name=title placeholder=Title>
    <textarea name=body></textarea>
    <select name=location>
      <option>SF</option>
      <option>Van</option>
      <option>NYC</option>
    </select>
    <input type=file name=photo accept=image/png,image/jpeg>
    <button type=submit>Save</button>
  </form>
  `})
}
