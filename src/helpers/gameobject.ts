import type { GameObj, HealthComp } from 'kaplay'

import { Tag } from '../constants'
import type { Enemy, Gunner } from '../gameobjects'

export function isAlive(gameObject: GameObj<HealthComp>): boolean {
  return Boolean(typeof gameObject?.hp === 'function' && gameObject.hp() > 0)
}

function getEnemies() {
  return get(Tag.Enemy) as Enemy[]
}

export function getClosestEnemy(gunner: Gunner): Enemy | undefined {
  const enemies = getEnemies()

  const distances = enemies.reduce((dist: number[], zombie) => {
    dist.push(gunner.pos.dist(zombie.pos))
    return dist
  }, [])

  return enemies[distances.indexOf(Math.min(...distances))]
}
