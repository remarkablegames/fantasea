import { Tag } from '../constants'
import { hints, state } from '../data'

const width = 400

export function addHint() {
  const hint = hints[state.level]

  if (!hint) {
    return
  }

  const box = add([
    rect(width, hint.height),
    anchor('center'),
    color(BLACK),
    opacity(0.3),
    pos(215, 175),
    Tag.Hint,
  ])

  box.add([
    text(hint.text, {
      align: 'center',
      size: 20,
      width,
    }),
    anchor('center'),
    color(WHITE),
  ])
}

export function getHint() {
  return get(Tag.Hint)[0]
}
