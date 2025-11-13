import { Scene } from '../constants'
import { addCollision } from '../events'
import { addBackground, addBase, addEnemy, addGunner } from '../gameobjects'

const OFFSET = 0

scene(Scene.Game, () => {
  addBackground()
  addBase()

  add([text('Wave: 1', { width: width() / 2 }), pos(12, 12)])

  const time = 5
  const maxLoops = 5

  loop(
    time,
    () => {
      let x = 0
      let y = 0

      if (randi()) {
        x = randi() ? -OFFSET : width() + OFFSET
        y = rand(0, height())
      } else {
        x = rand(0, width())
        y = randi() ? -OFFSET : height() + OFFSET
      }

      addEnemy(x, y)
    },
    maxLoops,
    true,
  )

  onClick(() => {
    addGunner()
  })

  addCollision()
})
