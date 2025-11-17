import { Tag, Z } from '../constants'
import type { Hero as Data } from '../data'
import { addHero, getBase } from '.'

export function addDraggable(data: Data) {
  const draggable = add([
    sprite(data.sprite, { width: data.width, height: data.height }),
    color(RED),
    opacity(0.5),
    anchor('center'),
    pos(mousePos()),
    area(),
    fakeMouse(),
    z(Z.UI),
    Tag.Draggable,
  ])

  draggable.onCollide(Tag.Droppable, () => {
    draggable.color = GREEN
  })

  draggable.onCollideEnd(Tag.Droppable, () => {
    draggable.color = RED
  })

  draggable.onMouseRelease(() => {
    draggable.destroy()
    setCursor('default')
    const base = getBase()

    if (base && draggable.isColliding(base)) {
      addHero(data, draggable.pos)
    }
  })

  return draggable
}
