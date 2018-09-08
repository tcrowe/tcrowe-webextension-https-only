let {get, set, load, onChange} = require('./storage')
let toggleOn = document.getElementById('toggle-on')
let toggleOff = document.getElementById('toggle-off')

function update() {
  let enabled = get('enabled')
  toggleOn.checked = enabled === true
  toggleOff.checked = enabled === false
}

toggleOn.addEventListener('click', () => set('enabled', true))
toggleOff.addEventListener('click', () => set('enabled', false))
onChange(update)
load(update)
