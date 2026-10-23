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
  getHint,
  onTimeScale,
} from '../gameobjects'

scene(Scene.Game, () => {
  setCursor('default')

  const level = levels[state.level]

  if (!level) {
    go(Scene.Win)
    return
  }

  addBackground()
  addCollision()

  state.temp.start = false
  state.temp.basesTotal = level.bases.length
  state.temp.enemies = level.enemies.map(({ total, enemy, timer }) => ({
    total,
    sprite: enemy.sprite,
    timer: { ...timer },
  }))
  state.temp.enemiesKilled = 0
  state.temp.enemiesTotal = level.enemies.reduce(
    (sum, { total }) => sum + total,
    0,
  )

  const root = addRoot()

  function setupTimers() {
    if (!state.temp.start) {
      return
    }

    state.temp.enemies.forEach(({ timer, total }, index) => {
      root.wait(timer.wait / debug.timeScale, () => {
        timer.wait = 0

        root.loop(
          timer.interval / debug.timeScale,
          () => addEnemy(level.enemies[index].enemy),
          total,
        )
      })
    })
  }

  onTimeScale(setupTimers)

  const startButton = addButton({
    label: 'Start',
    width: 150,
    height: 60,
    position: vec2(90),
    onClick() {
      setCursor('default')
      state.temp.start = true
      getHint()?.destroy()
      startButton.destroy()
      root.trigger(Event.EnemyCounter)
      setupTimers()
    },
  })

  addHint()
  addLevelInfo()
  addTimeScale()
  addBases(level.bases)
  addCards(level.heroes)
})
