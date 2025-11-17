import { Sprite, Tag } from '../constants'
import { addHealth } from '.'

export type Base = ReturnType<typeof addBase>

export function addBase(x = center().x, y = center().y) {
  const base = add([
    sprite(Sprite.Island),
    scale(0.5),
    pos(x, y),
    anchor('center'),
    area({
      shape: new Polygon([vec2(0, -100), vec2(180, 20), vec2(-170, 10)]),
    }),
    body({ isStatic: true }),
    health(100, 100),
    Tag.Base,
  ])

  addHealth(base)

  return base
}

export function getBase() {
  const base = get(Tag.Base)[0] as Base

  if (!base?.exists()) {
    return
  }

  return base
}
