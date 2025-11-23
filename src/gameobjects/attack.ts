import { Tag } from '../constants'
import { beachball } from '../data'
import { getClosestEnemy } from '../helpers'
import type { Hero } from '.'

export type Attack = ReturnType<typeof addAttack>

export function addAttack(hero: Hero) {
  const enemy = getClosestEnemy(hero)

  if (!enemy) {
    return
  }

  const heroPos = hero.screenPos()!
  const direction = enemy.pos.sub(heroPos).unit()

  const attack = add([
    pos(heroPos),
    move(direction, beachball.speed),
    sprite(beachball.sprite, {
      width: beachball.width,
      height: beachball.height,
    }),
    area({
      shape: beachball.shape,
    }),
    offscreen({ destroy: true }),
    anchor('center'),
    Tag.Attack,
    {
      damage: beachball.damage,
      direction,
    },
  ])

  return attack
}
