import { Scene, Tag } from '../constants'
import { type Base, type BaseMultiplier, state } from '../data'
import { onRootDestroy } from '../events'
import { getMultiplierText } from '../helpers'
import { addDroppable, addHealth, addTooltip, getRoot } from '.'

export type Bases = ReturnType<typeof addBases>

export function addBases(bases: Base[]) {
  const root = getRoot()

  const gameObjects = bases.map((data) => {
    const multiplier = getMultiplier(data)

    const base = root.add([
      sprite(data.sprite, {
        width: data.width,
      }),
      pos(data.pos),
      anchor('center'),
      area({ shape: data.shape }),
      body({ isStatic: true }),
      health(data.health),
      Tag.Base,
      {
        multiplier,
      },
    ])

    addHealth(base)
    addDroppable(base, data.droppable)
    addTooltip({
      width: 240,
      height: 160,
      text: `HP: ${data.health} (Max)
${getMultiplierText(multiplier)}`,
      parent: base,
    })

    base.onDeath(() => {
      base.destroy()
      addKaboom(base.pos)
      state.temp.basesTotal -= 1

      if (!state.temp.basesTotal) {
        wait(1, () => go(Scene.Lose))
      }
    })

    return base
  })

  const resizeController = onResize(() => {
    gameObjects.forEach(
      (gameObject, index) => (gameObject.pos = bases[index].pos),
    )
  })

  onRootDestroy(() => {
    resizeController.cancel()
  })

  return gameObjects
}

export function getBases() {
  const root = getRoot()
  const bases = root.get(Tag.Base) as Bases

  return bases.filter((base) => !base.dead)
}

export function getRandomBase() {
  const bases = getBases()

  if (!bases.length) {
    return
  }

  return bases[randi(bases.length)]
}

function getMultiplier(base: Base): BaseMultiplier {
  const multiplier = { ...base.multiplier }

  Object.entries(state.multiplier[base.sprite]).forEach(([key, value]) => {
    multiplier[key as keyof BaseMultiplier] *= value
  })

  return multiplier
}
