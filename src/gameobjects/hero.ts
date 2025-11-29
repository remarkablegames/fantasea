import type { TimerController } from 'kaplay'

import type { Hero as Data } from '../data'
import { addAttack, type Bases, type Droppable, onTimeScale } from '.'

export type Hero = ReturnType<typeof addHero>

export function addHero(data: Data, droppable: Droppable) {
  droppable.removeAll('*')
  const multiplier = getMultipler(droppable)

  const hero = droppable.add([
    sprite(data.sprite, {
      width: data.width,
      height: data.height,
    }),
    pos(),
    anchor('center'),
    timer(),
  ])

  let wait: TimerController | undefined
  let loop: TimerController | undefined

  function setupTimers() {
    wait?.cancel()
    loop?.cancel()

    wait = hero.wait(
      (data.attack.timer.wait * multiplier.cooldown) / debug.timeScale,
      () => {
        loop = hero.loop(
          (data.attack.timer.interval * multiplier.cooldown) / debug.timeScale,
          () => addAttack(hero),
        )
      },
    )
  }

  setupTimers()
  onTimeScale(setupTimers)

  return hero
}

function getMultipler(droppable: Droppable) {
  const base = droppable.parent as Bases[0]
  return base.multiplier
}
