import { Scene } from '../constants'
import { state } from '../data'
import { addButton } from '../gameobjects'

scene(Scene.Lose, () => {
  add([
    text('You lost', { size: 72 }),
    anchor('center'),
    pos(center().sub(0, 100)),
  ])

  const actions = [
    {
      text: 'Retry',
      callback() {
        go(Scene.Game)
      },
    },
    {
      text: 'Restart',
      callback() {
        state.level = 0
        go(Scene.Game)
      },
    },
  ]

  actions.forEach((action, index) => {
    addButton({
      label: action.text,
      size: 36,
      width: 200,
      height: 60,
      position: center().add(0, 80 * (index + 1)),
      onClick: action.callback,
    })
  })
})
