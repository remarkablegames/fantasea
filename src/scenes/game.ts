import { Scene, Z } from '../constants'
import { levels, state } from '../data'
import { addCollision } from '../events'
import {
  addBackground,
  addBases,
  addButton,
  addCards,
  addEnemy,
  addRoot,
  addTimeScale,
} from '../gameobjects'

scene(Scene.Game, () => {
  addBackground()
  addCollision()

  const level = levels[state.level]

  if (!level) {
    return go(Scene.Win)
  }

  state.tempData.basesTotal = level.bases.length

  state.tempData.enemiesTotal = level.enemies.reduce(
    (total, enemy) => total + enemy.total,
    0,
  )

  const root = addRoot()

  add([text(`Wave: ${state.level + 1}`), pos(12, 12), z(Z.UI)])

  const startButton = addButton({
    label: 'Start',
    width: 150,
    height: 60,
    comps: [pos(90, 90)],
    onClick() {
      level.enemies.forEach(({ enemy, timer, total }) => {
        root.wait(timer.wait, () => {
          root.loop(timer.interval, () => addEnemy(enemy), total)
        })
      })

      startButton.destroy()
    },
  })

  addTimeScale()
  addBases(level.bases)
  addCards(level.heroes)
})
