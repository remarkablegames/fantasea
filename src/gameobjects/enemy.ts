import { Sprite, Tag } from '../constants'
import { addHealth, getBase } from '.'

export type Enemy = ReturnType<typeof addEnemy>

export function addEnemy(x: number, y: number) {
  const damage = randi(1, 10)
  const speed = randi(50, 100)

  const enemy = add([
    sprite(Sprite.Enemy),
    pos(x, y),
    anchor('center'),
    area(),
    body(),
    health(10, 10),
    Tag.Enemy,
    { damage, speed },
  ])

  addHealth(enemy)

  enemy.onUpdate(() => {
    const player = getBase()

    if (!player) {
      return
    }

    const direction = player.pos.sub(enemy.pos).unit()
    enemy.move(direction.scale(enemy.speed))
  })

  enemy.onDeath(() => {
    enemy.destroy()
    addKaboom(enemy.pos)
  })

  return enemy
}
