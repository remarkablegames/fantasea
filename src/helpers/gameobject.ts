import { Tag } from '../constants'
import { type Enemy, getRoot, type Hero } from '../gameobjects'

function getEnemies(): Enemy[] {
  return getRoot().get(Tag.Enemy)
}

export function getClosestEnemy(hero: Hero): Enemy | undefined {
  const enemies = getEnemies()

  const distances = enemies.reduce((dist: number[], enemy) => {
    dist.push(hero.pos.dist(enemy.pos))
    return dist
  }, [])

  return enemies[distances.indexOf(Math.min(...distances))]
}
