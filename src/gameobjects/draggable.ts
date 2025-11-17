import { Z } from '../constants'
import type { Character as Data } from '../data'
import { addCharacter } from '.'

export function addDraggable(data: Data) {
  const draggable = add([
    sprite(data.sprite, { width: data.width, height: data.height }),
    anchor('center'),
    pos(mousePos()),
    opacity(0.5),
    fakeMouse(),
    z(Z.UI),
  ])

  draggable.onMouseRelease(() => {
    draggable.destroy()
    setCursor('default')
    addCharacter(data, draggable.pos)
  })

  return draggable
}
