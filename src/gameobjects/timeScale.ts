import type { GameObj, PosComp } from 'kaplay'

import { Event, Z } from '../constants'
import { onRootDestroy } from '../events'
import { addButton, getRoot } from '.'

const SPEEDS = ['⏩︎1', '⏩︎2', '⏩︎4', '⏩︎8']
const WIDTH = 60

const getButtonPos = (index: number) =>
  vec2(width() - (WIDTH + 10) * index - 40, 30)

export function addTimeScale() {
  const buttons = SPEEDS.reverse().map((speed, index) =>
    addButton({
      label: speed,
      size: 24,
      width: WIDTH,
      height: 40,
      comps: [pos(getButtonPos(index))],
      zIndex: Z.UI,
      onClick() {
        debug.timeScale = Number(speed.replace(/^\D+/g, ''))
        getRoot().trigger(Event.TimeScale)
      },
    }),
  )

  const resizeController = onResize(() => {
    buttons.forEach(
      (button, index) =>
        ((button as unknown as GameObj<PosComp>).pos = getButtonPos(index)),
    )
  })

  onRootDestroy(() => {
    resizeController.cancel()
  })
}

export function onTimeScale(action: () => void) {
  getRoot().on(Event.TimeScale, action)
}
