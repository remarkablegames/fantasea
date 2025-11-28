import { Event, Scene } from '../constants'
import { levels, state } from '../data'
import { addCollision } from '../events'
import {
  addBackground,
  addBases,
  addButton,
  addCards,
  addEnemy,
  addHint,
  addLevelInfo,
  addRoot,
  addTimeScale,
  type Hint,
} from '../gameobjects'

scene(Scene.Game, () => {
  addBackground()
  addCollision()

  const level = levels[state.level]

  if (!level) {
    return go(Scene.Win)
  }

  state.temp.basesTotal = level.bases.length
  state.temp.enemiesKilled = 0
  state.temp.enemiesTotal = level.enemies.reduce(
    (sum, enemy) => sum + enemy.total,
    0,
  )

  const root = addRoot()

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

      hint?.destroy()
      startButton.destroy()
      root.trigger(Event.EnemyCounter)
    },
  })

  let hint: Hint | undefined

  switch (state.level) {
    case 0:
      hint = addHint({
        txt: 'Drag and drop the hero (bottom) to the island (center) and press "Start"',
        width: 400,
        height: 100,
        size: 20,
        comps: [pos(215, 190)],
      })
      break
  }

  addLevelInfo()
  addTimeScale()
  addBases(level.bases)
  addCards(level.heroes)
})
