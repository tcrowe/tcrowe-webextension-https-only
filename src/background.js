let {get} = require('./storage')

let httpStartPattern = /^http:\/\//
let httpsStart = 'https://'
let httpFilter = {urls: ['http://*/*']}

// ignore patterns
let localhostPatterns = ['http://127.0.0.1', 'http://localhost']

function before_request(req) {
  let enabled = get('enabled')

  if (enabled === false) {
    // the extension is disabled
    return
  }

  let {url} = req
  let localhost = false

  localhostPatterns.forEach(item => {
    if (url.startsWith(item) === true) {
      localhost = true
    }
  })

  if (localhost === true) {
    return
  }

  let redirectUrl = url.replace(httpStartPattern, httpsStart)

  return {redirectUrl}
}

chrome.webRequest.onBeforeRequest.addListener(before_request, httpFilter, [
  'blocking'
])
