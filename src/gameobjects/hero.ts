import type { TimerController } from 'kaplay'

import { type BaseMultiplier, type Hero as Data, state } from '../data'
import { addAttack, type Bases, type Droppable, onTimeScale } from '.'

export type Hero = ReturnType<typeof addHero>

export function addHero(data: Data, droppable: Droppable) {
  droppable.removeAll('*')

  const multiplier = getMultiplier(data, droppable)

  const hero = droppable.add([
    sprite(data.sprite, {
      width: data.width,
      height: data.height,
    }),
    pos(),
    anchor('center'),
    timer(),
    {
      multiplier,
    },
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

function getMultiplier(data: Data, droppable: Droppable): BaseMultiplier {
  const base = droppable.parent as Bases[0]
  const multiplier = { ...base.multiplier }

  Object.entries(state.multiplier[data.sprite]).forEach(([key, value]) => {
    multiplier[key as keyof BaseMultiplier] *= value
  })

  return multiplier
}
