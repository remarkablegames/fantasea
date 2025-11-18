import { Tag } from '../constants'
import { getClosestEnemy } from '../helpers'
import type { Hero } from '.'

const DAMAGE = 1
const SIZE = 5
const SPEED = 300

export type Attack = ReturnType<typeof addAttack>

export function addAttack(hero: Hero) {
  const enemy = getClosestEnemy(hero)

  if (!enemy) {
    return
  }

  const direction = enemy.pos.sub(hero.pos).unit()

  const attack = add([
    pos(hero.pos),
    move(direction, SPEED),
    circle(SIZE),
    area(),
    offscreen({ destroy: true }),
    anchor('center'),
    color(BLACK),
    Tag.Attack,
    {
      damage: DAMAGE,
      direction,
    },
  ])

  return attack
}
