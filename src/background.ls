
keys = <[enabled]>
httpStartPattern = /^http\:\/\//
httpsStart = 'https://'
httpFilter = {urls: ['http://*/*']}

# ignore
localhostPatterns = [
  'http://127.0.0.1'
  'http://localhost'
]

enabled = true

before_request = (req) ->
  # extention can be disabled
  return if not enabled
  {url} = req
  localhost = false
  localhostPatterns.forEach (item) ->
    if url.startsWith item then localhost := true
  return if localhost is true
  redirectUrl = url.replace(httpStartPattern, httpsStart)
  {redirectUrl}

update = (opts = {}) ->
  if opts.enabled is void
    enabled := true
    return save({enabled})
  enabled := opts.enabled

load = ->
  chrome.storage.local.get keys, update

save = (opts) ->
  chrome.storage.local.set opts, update

storage_changed = ->
  load()

chrome.webRequest
  .onBeforeRequest
  .addListener before_request, httpFilter, <[blocking]>

chrome.storage.onChanged.addListener storage_changed
load()
