import type { Vec2 } from 'kaplay'

import type { Hero as Data } from '../data'
import { addBullet } from '.'

export type Hero = ReturnType<typeof addHero>

export function addHero(data: Data, position: Vec2) {
  const hero = add([
    sprite(data.hero.sprite, {
      width: data.hero.width,
      height: data.hero.height,
    }),
    pos(position),
    anchor('center'),
    timer(),
  ])

  hero.wait(data.timer.wait, () => {
    hero.loop(data.timer.interval, () => addBullet(hero))
  })

  return hero
}
