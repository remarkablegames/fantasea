import { Sound, Tag, Z } from '../constants'
import type { Hero } from '../data'
import { addHero, getDroppables } from '.'

export function addDraggable(hero: Hero) {
  const draggable = add([
    sprite(hero.sprite, {
      width: hero.width,
    }),
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

    getDroppables().forEach((droppable) => {
      if (draggable.isColliding(droppable)) {
        play(Sound.Drop)
        addHero(hero, droppable)
      }
    })
  })

  return draggable
}
