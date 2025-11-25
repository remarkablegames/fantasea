import { Event, Z } from '../constants'
import { addButton, getRoot } from '.'

const WIDTH = 60
const PADDING = 10
const OFFSET = 40

export function addTimeScale() {
  const root = getRoot()
  const speeds = ['⏩︎1', '⏩︎2', '⏩︎4', '⏩︎8']

  speeds.reverse().forEach((speed, index) => {
    addButton({
      label: speed,
      size: 24,
      width: WIDTH,
      height: 40,
      comps: [pos(width() - (WIDTH + PADDING) * index - OFFSET, 30)],
      zIndex: Z.UI,
      onClick() {
        const timeScale = Number(speed.replace(/^\D+/g, ''))
        debug.timeScale = timeScale
        root.trigger(Event.TimeScale)
      },
    })
  })
}
