import 'kaplay/global'

import kaplay from 'kaplay'

kaplay({
  background: '#5cc6ba',
})

const { start } = await import('./scenes')

start()

// press F1
// debug.inspect = true
