import { Sprite } from '../constants'

export function addGunner(x = mousePos().x, y = mousePos().y) {
  const gunner = add([
    sprite(Sprite.Gunner),
    pos(x, y),
    anchor('center'),
    area(),
    body({ isStatic: true }),
  ])

  return gunner
}
