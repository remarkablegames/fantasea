import { Scene, Tag } from '../constants'
import type { Base } from '../data'
import { addDroppable, addHealth } from '.'

export type Bases = ReturnType<typeof addBases>

export function addBases(bases: Base[]) {
  return bases.map((data) => {
    const base = add([
      sprite(data.sprite, {
        width: data.width,
        height: data.height,
      }),
      pos(data.pos),
      anchor('center'),
      area({
        shape: new Polygon([vec2(0, -50), vec2(90, 10), vec2(-80, 5)]),
      }),
      body({ isStatic: true }),
      health(10, 10),
      Tag.Base,
    ])

    addHealth(base)
    addDroppable(base, vec2(0, -10))

    // TODO: update when all bases are dead
    base.onDeath(() => {
      base.destroy()
      addKaboom(base.pos)
      wait(1, () => go(Scene.Lose))
    })

    return base
  })
}

export function getBases() {
  const bases = get(Tag.Base) as Bases
  return bases.filter((base) => !base.dead)
}
