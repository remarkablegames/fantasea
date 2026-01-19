import { Scene } from '../constants'
import { state } from '../data'
import { addButton, addConfetti } from '../gameobjects'

const OFFSET_Y = 130

const getPos = () => center().sub(0, OFFSET_Y)

scene(Scene.Win, () => {
  debug.timeScale = 1

  const message = add([
    text('You won!', { size: 72 }),
    anchor('center'),
    pos(getPos()),
  ])

  addButton({
    label: 'Restart',
    size: 36,
    width: 200,
    height: 60,
    parent: message,
    position: vec2(0, OFFSET_Y),
    onClick() {
      state.level = 0
      go(Scene.Game)
      resizeController.cancel()
    },
  })

  addConfetti({ pos: center() })

  onMousePress(() => addConfetti({ pos: mousePos() }))

  const resizeController = onResize(() => {
    message.pos = getPos()
  })
})
