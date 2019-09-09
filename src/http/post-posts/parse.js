function getValueIgnoringCase(object, key) {
  let find = k=> k.toLocaleLowerCase() === key.toLowerCase()
  let found = Object.keys(object).find(find)
  return object[found]
}

module.exports = function parse(event, spotText=false) {

  let boundary = getValueIgnoringCase(event.headers, 'Content-Type').split('=')[1]
  let result = {}
  let raw = Buffer.from(event.body.base64, 'base64').toString()

  raw.split(boundary).forEach(item => {

    let isFile = /filename=".+"/g.test(item)
    let isName = /name=".+"/g.test(item) && !item.includes('filename')

    if (isFile) {
      result[item.match(/name=".+";/g)[0].slice(6, -2)] = {
        type: 'file',
        filename: item.match(/filename=".+"/g)[0].slice(10, -1),
        contentType: item.match(/Content-Type:\s.+/g)[0].slice(14),
        content: spotText? Buffer.from(item.slice(item.search(/Content-Type:\s.+/g) + item.match(/Content-Type:\s.+/g)[0].length + 4, -4), 'binary'):
                        item.slice(item.search(/Content-Type:\s.+/g) + item.match(/Content-Type:\s.+/g)[0].length + 4, -4),
      }
    }
    else if (isName) {
      result[item.match(/name=".+"/g)[0].slice(6, -1)] = item.slice(item.search(/name=".+"/g) + item.match(/name=".+"/g)[0].length + 4, -4)
    }
  })
  return result
}
