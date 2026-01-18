import { Scene } from '../constants'
import { state } from '../data'
import { addButton } from '../gameobjects'

const getPos = () => center().sub(0, 100)

scene(Scene.Lose, () => {
  const message = add([
    text('You lost', { size: 72 }),
    anchor('center'),
    pos(getPos()),
  ])

  const actions = [
    {
      text: 'Retry',
      callback() {
        go(Scene.Game)
        resizeController.cancel()
      },
    },
    {
      text: 'Restart',
      callback() {
        state.level = 0
        go(Scene.Game)
        resizeController.cancel()
      },
    },
  ]

  actions.forEach((action, index) => {
    addButton({
      label: action.text,
      size: 36,
      width: 200,
      height: 60,
      parent: message,
      position: vec2(0, 80 * (index + 1) + 40),
      onClick: action.callback,
    })
  })

  const resizeController = onResize(() => {
    message.pos = getPos()
  })
})
