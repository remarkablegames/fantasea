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

    const currentState = state.temp
    const enemyState = currentState.enemies.find(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      ({ sprite }) => sprite === enemy.sprite,
    )

    if (!enemyState) {
      return
    }

    enemyState.total -= 1
    currentState.enemiesKilled += 1
    root.trigger(Event.EnemyCounter)

    if (!getBases().length) {
      return
    }

    if (currentState.enemiesKilled === currentState.enemiesTotal) {
      state.level += 1
      wait(1, () => {
        addReward()
      })
    }
  })

  return enemy
}
