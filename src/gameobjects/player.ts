import { Sprite, Tag } from '../constants'
import type { Player } from '../types'
import { addHealth } from '.'

export function addPlayer(x = center().x, y = center().y) {
  const player = add([
    sprite(Sprite.Bean),
    pos(x, y),
    anchor('center'),
    area(),
    body({ isStatic: true }),
    health(100, 100),
    Tag.Player,
  ])

  addHealth(player)

  return player
}

export function getPlayer() {
  const player = get(Tag.Player)[0] as Player

  if (!player?.exists()) {
    return
  }

  return player
}
