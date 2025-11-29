import { Tag } from '../constants'
import { hints, state } from '../data'

const PADDING = 10

export function addHint() {
  const hint = hints[state.level]

  if (!hint) {
    return
  }

  const box = add([
    rect(hint.width, hint.height),
    color(BLACK),
    opacity(0.3),
    pos(PADDING, 135),
    Tag.Hint,
  ])

  box.add([
    text(hint.text, {
      size: 20,
      width: hint.width,
    }),
    color(WHITE),
    pos(PADDING),
  ])
}

export function getHint() {
  return get(Tag.Hint)[0]
}
