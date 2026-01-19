import { Event, Z } from '../constants'
import { onRootDestroy } from '../events'
import { addButton, getRoot } from '.'

const SPEEDS = ['⏩︎1', '⏩︎2', '⏩︎4', '⏩︎8']
const WIDTH = 60

const getPos = () => vec2(width() - WIDTH * SPEEDS.length - 10, 30)

export function addTimeScale() {
  const speeds = SPEEDS.slice().reverse()

  const container = add([pos(getPos())])

  speeds.map((speed, index) =>
    addButton({
      label: speed,
      size: 24,
      width: WIDTH,
      height: 40,
      parent: container,
      position: vec2((WIDTH + 10) * index, 0),
      zIndex: Z.UI,
      onClick() {
        debug.timeScale = Number(speed.replace(/^\D+/g, ''))
        getRoot().trigger(Event.TimeScale)
      },
    }),
  )

  const resizeController = onResize(() => {
    container.pos = getPos()
  })

  onRootDestroy(() => {
    resizeController.cancel()
  })
}

export function onTimeScale(action: () => void) {
  getRoot().on(Event.TimeScale, action)
}
