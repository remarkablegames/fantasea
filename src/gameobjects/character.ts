import type { Vec2 } from 'kaplay'

import type { Character as Data } from '../data'

export type Character = ReturnType<typeof addCharacter>

export function addCharacter(data: Data, position: Vec2) {
  const character = add([
    sprite(data.sprite, { width: data.width, height: data.height }),
    sprite(data.sprite),
    pos(position),
    anchor('center'),
    timer(),
  ])

  character.loop(data.loop.time, () => data.loop.action(character))

  return character
}
