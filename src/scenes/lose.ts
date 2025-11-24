import { Scene } from '../constants'
import { state } from '../data'
import { addButton } from '../gameobjects'

scene(Scene.Lose, () => {
  const { x, y } = center()

  add([text('You lost', { size: 72 }), anchor('center'), pos(x, y - 100)])

  const actions = [
    {
      text: 'Continue',
      callback: () => go(Scene.Game),
    },
    {
      text: 'Restart',
      callback: () => {
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
      comps: [pos(x, y + 80 * (index + 1))],
      onClick: action.callback,
    })
  })
})
