import type { TimerController } from 'kaplay'

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
  onTimeScale,
} from '../gameobjects'

scene(Scene.Game, () => {
  addBackground()
  addCollision()

  const level = levels[state.level]

  if (!level) {
    return go(Scene.Win)
  }

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

  let wait: TimerController | undefined
  let loop: TimerController | undefined

  function setupTimers() {
    if (!state.temp.start) {
      return
    }

    wait?.cancel()
    loop?.cancel()

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
    comps: [pos(90, 90)],
    onClick() {
      state.temp.start = true
      hint?.destroy()
      startButton.destroy()
      root.trigger(Event.EnemyCounter)
      setupTimers()
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
