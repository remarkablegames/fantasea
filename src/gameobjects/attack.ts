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

  const heroPos = hero.screenPos()!
  const direction = enemy.pos.sub(heroPos).unit()
  let data = beachball

  switch (hero.sprite) {
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
      height: data.height,
      anim: data.sprite === Sprite.Sword ? Anim.Idle : undefined,
    }),
    area({ shape: data.shape }),
    anchor('center'),
    scale(),
    rotate(),
    health(data.health),
    opacity(),
    offscreen({ destroy: true }),
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
      attack.use(lifespan(1, { fade: 1 }))
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
