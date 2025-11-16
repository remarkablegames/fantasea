import { Tag } from '../constants'
import type { Enemy as Data } from '../data'
import { generateEnemyPos } from '../helpers'
import { addHealth, getBase } from '.'

export type Enemy = ReturnType<typeof addEnemy>

export function addEnemy(data: Data) {
  const enemy = add([
    sprite(data.sprite, {
      width: data.width,
      height: data.height,
    }),
    pos(generateEnemyPos()),
    anchor('center'),
    area({
      shape: data.shape,
    }),
    body(),
    health(data.health, data.health),
    Tag.Enemy,
    { damage: data.damage, speed: data.speed },
  ])

  addHealth(enemy)

  enemy.onUpdate(() => {
    const base = getBase()

    if (!base) {
      return
    }

    const direction = base.pos.sub(enemy.pos).unit()
    enemy.move(direction.scale(enemy.speed))
  })

  enemy.onDeath(() => {
    enemy.destroy()
    addKaboom(enemy.pos)
  })

  return enemy
}
