import { Sprite, Tag } from '../constants'
import type { Base } from '../types'
import { addHealth } from '.'

export function addBase(x = center().x, y = center().y) {
  const base = add([
    sprite(Sprite.Bean),
    pos(x, y),
    anchor('center'),
    area(),
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
