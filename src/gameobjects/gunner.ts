import { Sprite, Tag } from '../constants'
import { addBullet } from '.'

const LOOP_SECONDS = 3

export type Gunner = ReturnType<typeof addGunner>

export function addGunner(x = mousePos().x, y = mousePos().y) {
  const gunner = add([
    sprite(Sprite.Gunner),
    pos(x, y),
    anchor('center'),
    area(),
    body({ isStatic: true }),
    timer(),
    Tag.Gunner,
  ])

  gunner.loop(LOOP_SECONDS, () => addBullet(gunner), undefined, true)

  return gunner
}
