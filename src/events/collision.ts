import { Tag } from '../constants'
import { addSplash, type Base, type Enemy } from '../gameobjects'
import { isAlive } from '../helpers'

export function addCollision() {
  onCollide(
    Tag.Base,
    Tag.Enemy,
    // @ts-expect-error Types of parameters are incompatible.
    (base: Base, enemy: Enemy) => {
      if (isAlive(base) && isAlive(enemy)) {
        base.hurt(enemy.damage)
        enemy.destroy()
      }
    },
  )

  onCollide(
    Tag.Bullet,
    Tag.Enemy,
    // @ts-expect-error Types of parameters are incompatible.
    (bullet: Bullet, enemy: Enemy) => {
      if (isAlive(enemy)) {
        addSplash(bullet.pos, bullet.direction)
        bullet.destroy()
        enemy.hurt(bullet.damage)
      }
    },
  )
}
