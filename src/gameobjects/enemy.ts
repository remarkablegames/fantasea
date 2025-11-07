import { Sprite, Tag } from '../constants'
import { addHealth, getPlayer } from '.'

export function addEnemy(x: number, y: number) {
  const damage = randi(1, 10)
  const speed = randi(50, 100)

  const enemy = add([
    sprite(Sprite.Ghosty),
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
    const player = getPlayer()

    if (!player) {
      return
    }

    const direction = player.pos.sub(enemy.pos).unit()
    enemy.move(direction.scale(enemy.speed))
  })

  enemy.onCollide(Tag.Player, () => {
    getPlayer()?.hurt(damage)
    enemy.destroy()
  })

  return enemy
}
