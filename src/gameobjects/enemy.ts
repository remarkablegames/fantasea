import { Sprite, Tag } from '../constants'
import { addHealth, getPlayer } from '.'

export function addEnemy(x: number, y: number) {
  const speed = randi(50, 100)

  const enemy = add([
    sprite(Sprite.Ghosty),
    pos(x, y),
    anchor('center'),
    area(),
    body(),
    health(10, 10),
    Tag.Enemy,
    { speed },
  ])

  addHealth(enemy)

  enemy.onUpdate(() => {
    const player = getPlayer()

    if (!player?.exists()) {
      return
    }

    const direction = player.pos.sub(enemy.pos).unit()
    enemy.move(direction.scale(enemy.speed))
  })

  return enemy
}
