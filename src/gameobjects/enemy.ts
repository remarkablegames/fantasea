import { Event, Scene, Tag } from '../constants'
import { type Enemy as Data, state } from '../data'
import { generateEnemyPos } from '../helpers'
import { addHealth, getBases, getRandomBase, getRoot } from '.'

export type Enemy = ReturnType<typeof addEnemy>

export function addEnemy(data: Data) {
  const root = getRoot()

  const enemy = root.add([
    sprite(data.sprite, {
      width: data.width,
      height: data.height,
    }),
    pos(generateEnemyPos()),
    anchor('center'),
    area({
      shape: data.shape,
    }),
    body(),
    health(data.health),
    Tag.Enemy,
    {
      base: getRandomBase(),
      damage: data.damage,
      speed: data.speed,
    },
  ])

  addHealth(enemy)

  enemy.onUpdate(() => {
    if (enemy.base?.dead) {
      enemy.base = getRandomBase()
    }

    if (!enemy.base) {
      return
    }

    const direction = enemy.base.pos.sub(enemy.pos).unit()
    enemy.move(direction.scale(enemy.speed))
  })

  enemy.onDeath(() => {
    enemy.destroy()
    addKaboom(enemy.pos)
    state.temp.enemiesKilled += 1
    root.trigger(Event.EnemyCounter)

    if (!getBases().length) {
      return
    }

    if (state.temp.enemiesKilled === state.temp.enemiesTotal) {
      state.level += 1
      wait(1, () => go(Scene.Game))
    }
  })

  return enemy
}
