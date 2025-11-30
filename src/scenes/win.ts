import { Scene } from '../constants'
import { state } from '../data'
import { addButton, addConfetti } from '../gameobjects'

const OFFSET_Y = 70

scene(Scene.Win, () => {
  debug.timeScale = 1

  const { x, y } = center()

  add([text('You won!', { size: 72 }), anchor('center'), pos(x, y - OFFSET_Y)])

  addButton({
    label: 'Restart',
    size: 36,
    width: 200,
    height: 60,
    comps: [pos(x, y + OFFSET_Y)],
    onClick() {
      state.level = 0
      go(Scene.Game)
    },
  })

  addConfetti({ pos: center() })

  onMousePress(() => addConfetti({ pos: mousePos() }))
})
