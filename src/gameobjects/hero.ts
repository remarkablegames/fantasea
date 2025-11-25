import type { TimerController } from 'kaplay'

import { Event } from '../constants'
import type { Hero as Data } from '../data'
import { addAttack, type Droppable, getRoot } from '.'

export type Hero = ReturnType<typeof addHero>

export function addHero(data: Data, droppable: Droppable) {
  droppable.removeAll('*')

  const hero = droppable.add([
    sprite(data.sprite, {
      width: data.width,
      height: data.height,
    }),
    pos(),
    anchor('center'),
    timer(),
  ])

  let wait: TimerController
  let loop: TimerController

  function setupTimers() {
    wait?.cancel()
    loop?.cancel()

    wait = hero.wait(data.attack.timer.wait / debug.timeScale, () => {
      loop = hero.loop(data.attack.timer.interval / debug.timeScale, () =>
        addAttack(hero),
      )
    })
  }

  setupTimers()
  getRoot().on(Event.TimeScale, setupTimers)

  return hero
}
