import { Anim, Sound, Sprite, Tag } from '../constants'
import { arrow, beachball, sword } from '../data'
import { getClosestEnemy } from '../helpers'
import { getRoot, type Hero } from '.'

export type Attack = ReturnType<typeof addAttack>

export function addAttack(hero: Hero) {
  const enemy = getClosestEnemy(hero)
  if (!enemy) {
    return
  }

  const heroPos = hero.screenPos()
  if (!heroPos) {
    return
  }

  const direction = enemy.pos.sub(heroPos).unit()
  let data = beachball

  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-assignment
  switch (hero.sprite as Sprite) {
    case Sprite.Archer:
      data = arrow
      play(Sound.Swish, { volume: 0.8 })
      break

    case Sprite.Guard:
      data = sword
      play(Sound.Swing)
      break

    case Sprite.Witch:
      data = beachball
      play(Sound.Bounce)
      break
  }

  const attack = getRoot().add([
    pos(heroPos),
    sprite(data.sprite, {
      width: data.width,
      anim: data.sprite === Sprite.Sword ? Anim.Idle : undefined,
    }),
    area({ shape: data.shape }),
    anchor('center'),
    scale(hero.multiplier.scale),
    rotate(),
    health(data.health * hero.multiplier.health),
    lifespan((data.lifespan * hero.multiplier.lifespan) / debug.timeScale, {
      fade: 0.5 / debug.timeScale,
    }),
    opacity(),
    offscreen({ destroy: true }),
    Tag.Attack,
    {
      damage: data.damage * hero.multiplier.damage,
      direction,
      speed: data.speed * hero.multiplier.speed,
    },
  ])

  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-assignment
  switch (attack.sprite as Sprite) {
    case Sprite.Arrow:
      attack.tag(Tag.Sharp)
      attack.angle = enemy.pos.angle(heroPos) + 90
      attack.use(move(direction, data.speed))
      break

    case Sprite.Beachball:
      attack.tag(Tag.Bounce)
      attack.use(move(direction, data.speed))
      break

    case Sprite.Sword:
      attack.tag(Tag.Sharp)
      attack.anchor = 'right'
      attack.scaleTo(1.5)
      attack.play(Anim.Attack)
      attack.onUpdate(() => {
        attack.angle += 300 * dt() // Rotate by 300 degrees per second
      })
      break
  }

  attack.onDeath(() => {
    attack.destroy()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-assignment
    switch (attack.sprite as Sprite) {
      case Sprite.Beachball:
        play(Sound.Pop, { volume: 0.5 })
        break
    }
  })

  return attack
}
