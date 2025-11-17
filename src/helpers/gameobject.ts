import type { GameObj, HealthComp } from 'kaplay'

import { Tag } from '../constants'
import type { Character, Enemy } from '../gameobjects'

export function isAlive(gameObject: GameObj<HealthComp>): boolean {
  return Boolean(gameObject.hp > 0)
}

function getEnemies() {
  return get(Tag.Enemy) as Enemy[]
}

export function getClosestEnemy(character: Character): Enemy | undefined {
  const enemies = getEnemies()

  const distances = enemies.reduce((dist: number[], enemy) => {
    dist.push(character.pos.dist(enemy.pos))
    return dist
  }, [])

  return enemies[distances.indexOf(Math.min(...distances))]
}
