import { Sound, Sprite, Tag } from '../constants'
import { addSplash, type Attack, type Bases, type Enemy } from '../gameobjects'

export function addCollision() {
  onCollide(
    Tag.Base,
    Tag.Enemy,
    // @ts-expect-error Types of parameters are incompatible.
    (base: Bases[0], enemy: Enemy) => {
      if (base.dead || enemy.dead) {
        return
      }

      play(Sound.Hit)
      base.hp -= enemy.damage
      enemy.hp = 0
    },
  )

  onCollide(
    Tag.Attack,
    Tag.Enemy,
    // @ts-expect-error Types of parameters are incompatible.
    (attack: Attack, enemy: Enemy) => {
      if (!attack || enemy.dead) {
        return
      }

      addSplash(attack.pos, attack.direction)
      enemy.hp -= attack.damage
      attack.hp -= 1

      switch (attack.sprite) {
        case Sprite.Arrow:
          play(Sound.Arrow, { volume: 0.5 })
          break

        case Sprite.Beachball:
          play(Sound.Bounce, { detune: randi(0, 12) * 100 })
          attack.direction = Vec2.fromAngle(attack.pos.angle(enemy.pos))
          attack.use(move(attack.direction, attack.speed))
          break

        case Sprite.Sword:
          play(Sound.Stab, { volume: 0.6 })
          break
      }
    },
  )

  onCollide(
    Tag.Bounce,
    Tag.Bounce,
    // @ts-expect-error Types of parameters are incompatible.
    (bounce1: Attack, bounce2: Attack) => {
      if (!bounce1 || !bounce2) {
        return
      }

      play(Sound.Bounce, { detune: randi(0, 12) * 100 })

      bounce1.direction = Vec2.fromAngle(bounce1.pos.angle(bounce2.pos))
      bounce2.direction = Vec2.fromAngle(bounce2.pos.angle(bounce1.pos))

      bounce1.use(move(bounce1.direction, bounce1.speed))
      bounce2.use(move(bounce2.direction, bounce2.speed))
    },
  )

  onCollide(
    Tag.Bounce,
    Tag.Sharp,
    // @ts-expect-error Types of parameters are incompatible.
    (bounce: Attack) => {
      if (bounce) {
        bounce.hp = 0
      }
    },
  )
}
