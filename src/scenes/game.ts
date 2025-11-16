import { Scene } from '../constants'
import { levels } from '../data'
import { addCollision } from '../events'
import { addBackground, addBase, addCharacters, addEnemy } from '../gameobjects'

scene(Scene.Game, () => {
  addBackground()
  addBase()
  addCollision()
  addCharacters()

  add([text('Wave: 1', { width: width() / 2 }), pos(12, 12)])

  const level = levels[0]

  level.enemies.forEach(({ enemy, timer, total }) => {
    wait(timer.wait, () => {
      loop(timer.interval, () => addEnemy(enemy), total)
    })
  })
})
