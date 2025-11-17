import { Sprite, Tag } from '../constants'
import { addHealth } from '.'

export type Base = ReturnType<typeof addBase>

export function addBase(x = center().x, y = center().y) {
  const base = add([
    sprite(Sprite.Island, { width: 212, height: 106 }),
    pos(x, y),
    anchor('center'),
    area({
      shape: new Polygon([vec2(0, -50), vec2(90, 10), vec2(-80, 5)]),
    }),
    body({ isStatic: true }),
    health(100, 100),
    Tag.Base,
  ])

  addHealth(base)

  base.add([
    rect(50, 50),
    outline(3),
    color(WHITE),
    opacity(0.5),
    pos(0, -10),
    anchor('center'),
    area(),
    Tag.Droppable,
  ])

  return base
}

export function getBase() {
  const base = get(Tag.Base)[0] as Base

  if (!base?.exists()) {
    return
  }

  return base
}
