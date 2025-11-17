import { Tag } from '../constants'
import { getClosestEnemy } from '../helpers'
import type { Character } from '.'

const DAMAGE = 2
const SIZE = 5
const SPEED = 300

export type Bullet = ReturnType<typeof addBullet>

export function addBullet(character: Character) {
  const enemy = getClosestEnemy(character)

  if (!enemy) {
    return
  }

  const direction = enemy.pos.sub(character.pos).unit()

  const bullet = add([
    pos(character.pos),
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
