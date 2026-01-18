import { Scene } from '../constants'
import { state } from '../data'
import { addButton, addConfetti } from '../gameobjects'

const OFFSET_Y = 70

scene(Scene.Win, () => {
  debug.timeScale = 1

  add([
    text('You won!', { size: 72 }),
    anchor('center'),
    pos(center().sub(0, OFFSET_Y)),
  ])

  addButton({
    label: 'Restart',
    size: 36,
    width: 200,
    height: 60,
    position: center().add(0, OFFSET_Y),
    onClick() {
      state.level = 0
      go(Scene.Game)
    },
  })

  addConfetti({ pos: center() })

  onMousePress(() => addConfetti({ pos: mousePos() }))
})
