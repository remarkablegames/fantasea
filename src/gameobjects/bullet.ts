import { Tag } from '../constants'
import { getClosestEnemy } from '../helpers'
import type { Gunner } from '.'

const DAMAGE = 2
const SIZE = 5
const SPEED = 300

export type Bullet = ReturnType<typeof addBullet>

export function addBullet(gunner: Gunner) {
  const enemy = getClosestEnemy(gunner)

  if (!enemy) {
    return
  }

  const direction = enemy.pos.sub(gunner.pos).unit()

  const bullet = add([
    pos(gunner.pos),
    move(direction, SPEED),
    circle(SIZE),
    area(),
    offscreen({ destroy: true }),
    anchor('center'),
    color(BLACK),
    Tag.Bullet,
    {
      damage: DAMAGE,
      direction,
    },
  ])

  return bullet
}
