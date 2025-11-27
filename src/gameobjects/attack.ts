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
  let data = beachball

  switch (hero.sprite) {
    case Sprite.Archer:
      data = arrow
      play(Sound.Swish, { volume: 0.8 })
      break

    case Sprite.Witch:
      data = beachball
      play(Sound.Bounce)
      break

    case Sprite.Guard:
      data = beachball
      break
  }

  const root = getRoot()

  const attack = root.add([
    pos(heroPos),
    move(direction, data.speed),
    sprite(data.sprite, {
      width: data.width,
      height: data.height,
    }),
    area({
      shape: data.shape,
    }),
    health(data.health),
    opacity(),
    rotate(enemy.pos.angle(hero.screenPos()!) + 90),
    offscreen({ destroy: true }),
    anchor('center'),
    Tag.Attack,
    {
      damage: data.damage,
      direction,
      speed: data.speed,
    },
  ])

  switch (attack.sprite) {
    case Sprite.Arrow:
      attack.tag(Tag.Sharp)
      break

    case Sprite.Beachball:
      attack.tag(Tag.Bounce)
      break
  }

  attack.onHurt(() => {
    attack.opacity = attack.hp / attack.maxHP
  })

  attack.onDeath(() => {
    attack.destroy()

    switch (attack.sprite) {
      case Sprite.Beachball:
        play(Sound.Pop, { volume: 0.5 })
        break
    }
  })

  return attack
}
