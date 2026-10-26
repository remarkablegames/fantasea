import { Event, Sound, Tag } from '../constants'
import { type Enemy as Data, state } from '../data'
import { generateEnemyPos } from '../helpers'
import { addHealth, addReward, getBases, getRandomBase, getRoot } from '.'

export type Enemy = ReturnType<typeof addEnemy>

export function addEnemy(data: Data) {
  const root = getRoot()

  const enemy = root.add([
    sprite(data.sprite, {
      width: data.width,
    }),
    pos(generateEnemyPos()),
    anchor('center'),
    area({
      shape: data.shape,
    }),
    scale(data.scale),
    body(),
    health(data.health),
    Tag.Enemy,
    {
      base: getRandomBase(),
      speed: data.speed,
    },
  ])

  addHealth(enemy)

  const enemyState = state.temp.enemies.find(
    (enemy) => enemy.sprite === data.sprite,
  )

  if (enemyState) {
    enemyState.spawned += 1

    if (enemyState.spawned > enemyState.total) {
      enemy.destroy()
    }
  }

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
    play(Sound.Grunt, { detune: randi(0, 6) * 100 })

    state.temp.enemiesKilled += 1
    root.trigger(Event.EnemyCounter)

    if (!getBases().length) {
      return
    }

    if (state.temp.enemiesKilled === state.temp.enemiesTotal) {
      // prevent race condition when lose happens before win
      wait(2, () => {
        addReward()
      })
    }
  })

  return enemy
}
