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

      switch (attack.sprite) {
        case Sprite.Arrow:
          play(Sound.Arrow, { volume: 0.5 })
          break

        case Sprite.Beachball:
          play(Sound.Bounce, { detune: randi(0, 12) * 100 })
          break

        default:
          play(Sound.Hit)
          break
      }

      addSplash(attack.pos, attack.direction)
      attack.destroy()
      enemy.hp -= attack.damage
    },
  )
}
