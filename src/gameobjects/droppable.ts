import type { GameObj, Vec2 } from 'kaplay'

import { Tag } from '../constants'

export function addDroppable(base: GameObj, position: Vec2) {
  const droppable = base.add([
    rect(50, 50),
    outline(3),
    color(WHITE),
    opacity(0.5),
    pos(position),
    anchor('center'),
    area(),
    Tag.Droppable,
  ])

  return droppable
}
