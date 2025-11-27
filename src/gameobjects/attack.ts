import { Sound, Sprite, Tag } from '../constants'
import { arrow, beachball } from '../data'
import { getClosestEnemy } from '../helpers'
import { getRoot, type Hero } from '.'

export type Attack = ReturnType<typeof addAttack>

export function addAttack(hero: Hero) {
  const enemy = getClosestEnemy(hero)

  if (!enemy) {
    return
  }

  const heroPos = hero.screenPos()!
  const direction = enemy.pos.sub(heroPos).unit()

  let attackData = beachball
  switch (hero.sprite) {
    case Sprite.Archer:
      attackData = arrow
      play(Sound.Swish, { volume: 0.8 })
      break
    case Sprite.Witch:
      attackData = beachball
      play(Sound.Bounce)
      break
    case Sprite.Guard:
      attackData = beachball
      break
  }

  const root = getRoot()

  const attack = root.add([
    pos(heroPos),
    move(direction, attackData.speed),
    sprite(attackData.sprite, {
      width: attackData.width,
      height: attackData.height,
    }),
    area({
      shape: attackData.shape,
    }),
    rotate(enemy.pos.angle(hero.screenPos()!) + 90),
    offscreen({ destroy: true }),
    anchor('center'),
    Tag.Attack,
    {
      damage: attackData.damage,
      direction,
    },
  ])

  return attack
}
