import { Event, Z } from '../constants'
import { state } from '../data'
import { getRoot } from '.'

export function addLevelInfo() {
  const levelInfo = add([
    text(`Wave: ${state.level + 1}`),
    pos(12, 12),
    z(Z.UI),
  ])

  const enemiesCounter = levelInfo.add([
    text(),
    pos(0, 48),
    opacity(0),
    z(Z.UI),
  ])

  getRoot().on(Event.EnemyCounter, () => {
    enemiesCounter.opacity = 1
    enemiesCounter.text = `Enemies: ${state.temp.enemiesKilled}/${state.temp.enemiesTotal}`
  })

  return levelInfo
}
