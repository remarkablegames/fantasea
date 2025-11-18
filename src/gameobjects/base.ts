import type { Vec2 } from 'kaplay'

import { Scene, Sprite, Tag } from '../constants'
import { addDroppable, addHealth } from '.'

export type Base = ReturnType<typeof addBase>

export function addBase(position: Vec2) {
  const base = add([
    sprite(Sprite.Island, { width: 212, height: 106 }),
    pos(position),
    anchor('center'),
    area({
      shape: new Polygon([vec2(0, -50), vec2(90, 10), vec2(-80, 5)]),
    }),
    body({ isStatic: true }),
    health(10, 10),
    Tag.Base,
  ])

  addHealth(base)
  addDroppable(base, vec2(0, -10))

  base.onDeath(() => {
    base.destroy()
    addKaboom(base.pos)
    wait(1, () => go(Scene.Lose))
  })

  return base
}

export function getBase() {
  const base = get(Tag.Base)[0] as Base
  if (base?.exists()) {
    return base
  }
}
