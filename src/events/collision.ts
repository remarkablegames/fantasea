import { Sound, Tag } from '../constants'
import { addSplash, type Bases, type Enemy } from '../gameobjects'

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
      if (enemy.dead) {
        return
      }

      play(Sound.Hit)
      addSplash(attack.pos, attack.direction)
      attack.destroy()
      enemy.hp -= attack.damage
    },
  )
}
