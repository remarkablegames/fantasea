import { Scene, Tag } from '../constants'
import { type Enemy as Data, state } from '../data'
import { generateEnemyPos } from '../helpers'
import { addHealth, getBases } from '.'

export type Enemy = ReturnType<typeof addEnemy>

export function addEnemy(data: Data) {
  const enemy = add([
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
    health(data.health, data.health),
    Tag.Enemy,
    { damage: data.damage, speed: data.speed },
  ])

  addHealth(enemy)

  enemy.onUpdate(() => {
    const bases = getBases()

    if (!bases.length) {
      return
    }

    const direction = bases[0].pos.sub(enemy.pos).unit()
    enemy.move(direction.scale(enemy.speed))
  })

  enemy.onDeath(() => {
    enemy.destroy()
    addKaboom(enemy.pos)
    state.tempData.enemiesTotal -= 1
    const bases = getBases()

    if (!bases.length) {
      return
    }

    if (!state.tempData.enemiesTotal) {
      state.level += 1
      wait(1, () => go(Scene.Game))
    }
  })

  return enemy
}
