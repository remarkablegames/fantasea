import { Scene, Tag } from '../constants'
import { type Base, state } from '../data'
import { addDroppable, addHealth, getRoot } from '.'

export type Bases = ReturnType<typeof addBases>

export function addBases(bases: Base[]) {
  const root = getRoot()

  return bases.map((data) => {
    const base = root.add([
      sprite(data.sprite, {
        width: data.width,
        height: data.height,
      }),
      pos(data.pos),
      anchor('center'),
      area({ shape: data.shape }),
      body({ isStatic: true }),
      health(data.health, data.health),
      Tag.Base,
    ])

    addHealth(base)
    addDroppable(base, data.droppable)

    base.onDeath(() => {
      base.destroy()
      addKaboom(base.pos)
      state.tempData.basesTotal -= 1

      if (!state.tempData.basesTotal) {
        wait(1, () => go(Scene.Lose))
      }
    })

    return base
  })
}

export function getBases() {
  const root = getRoot()
  const bases = root.get(Tag.Base) as Bases

  return bases.filter((base) => !base.dead)
}
