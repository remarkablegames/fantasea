import type { Vec2 } from 'kaplay'

import { Sprite, Tag } from '../constants'
import { addBullet } from '.'

const LOOP_SECONDS = 3

export type Gunner = ReturnType<typeof addGunner>

export function addGunner(position: Vec2) {
  const gunner = add([
    sprite(Sprite.Guard),
    scale(0.5),
    pos(position),
    anchor('center'),
    area(),
    body({ isStatic: true }),
    timer(),
    Tag.Gunner,
  ])

  gunner.loop(LOOP_SECONDS, () => addBullet(gunner), undefined, true)

  return gunner
}
