import { Scene } from '../constants'
import { levels, state } from '../data'
import { addCollision } from '../events'
import { addBackground, addBases, addCards, addEnemy } from '../gameobjects'

scene(Scene.Game, () => {
  addBackground()
  addCollision()

  add([text(`Wave: ${state.level + 1}`), pos(12, 12)])

  const level = levels[state.level]

  if (!level) {
    return go(Scene.Win)
  }

  state.tempData.enemiesTotal = level.enemies.reduce(
    (total, enemy) => total + enemy.total,
    0,
  )

  addBases(level.bases)
  addCards(level.heroes)

  level.enemies.forEach(({ enemy, timer, total }) => {
    wait(timer.wait, () => {
      loop(timer.interval, () => addEnemy(enemy), total)
    })
  })
})
