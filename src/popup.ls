
keys = <[enabled]>
toggleOn = document.getElementById 'toggle-on'
toggleOff = document.getElementById 'toggle-off'

toggleOn.addEventListener 'click', ->
  save {+enabled}

toggleOff.addEventListener 'click', ->
  save {-enabled}

update = (opts = {}) ->
  {enabled} = opts
  if enabled is true
    toggleOn.checked = true
  if enabled is false
    toggleOff.checked = true

storage_changed = ->
  load()

load = ->
  chrome.storage.local.get keys, update

save = (opts) ->
  chrome.storage.local.set opts, update

chrome.storage.onChanged.addListener storage_changed
load()
